import React, { createContext, useState, useEffect, useContext } from 'react'
import { io } from 'socket.io-client'
import { AuthContext } from './AuthContext'

// Create the context
export const SocketContext = createContext()

// Create the provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)
  const [connectionError, setConnectionError] = useState(null)
  const [reconnectAttempts, setReconnectAttempts] = useState(0)
  const { user, isAuthenticated } = useContext(AuthContext)

  // Connect to socket when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Create socket instance with explicit connection URL
      const SOCKET_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api$/, '');
      const socketInstance = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
      
      socketInstance.on('connect', () => {
        console.log('Connected to socket server');
        setConnected(true);
        setConnectionError(null);
        setReconnectAttempts(0);
      });
      
      socketInstance.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setConnected(false);
        setConnectionError(error.message);
        setReconnectAttempts(prev => prev + 1);
      });
      
      socketInstance.on('disconnect', () => {
        console.log('Disconnected from socket server');
        setConnected(false);
      });
      
      setSocket(socketInstance);
      
      return () => {
        socketInstance.disconnect();
        setSocket(null);
        setConnected(false);
        setConnectionError(null);
      };
    }
  }, [isAuthenticated, user]);

  // Join a Chama room
  const joinChamaRoom = (chamaId) => {
    if (socket && connected) {
      socket.emit('joinChamaRoom', chamaId)
    }
  }

  // Leave a Chama room
  const leaveChamaRoom = (chamaId) => {
    if (socket && connected) {
      socket.emit('leaveChamaRoom', chamaId)
    }
  }

  // Send a message to a Chama room
  const sendMessage = (chamaId, message) => {
    if (socket && connected && user) {
      socket.emit('sendMessage', {
        chamaId,
        message,
        user: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
      })
    }
  }

  // Notify about new contribution
  const notifyContribution = (chamaId, contribution) => {
    if (socket && connected && user) {
      socket.emit('newContribution', {
        chamaId,
        contribution,
        user: {
          uid: user.uid,
          displayName: user.displayName
        }
      })
    }
  }

  // Provide a fallback for socket functionality when not connected
  const safeEmit = (event, data) => {
    if (socket && connected) {
      socket.emit(event, data);
      return true;
    } else {
      console.warn(`Socket not connected, couldn't emit ${event}`);
      return false;
    }
  };

  return (
    <SocketContext.Provider value={{
      socket,
      connected,
      connectionError,
      reconnectAttempts,
      safeEmit,
      joinChamaRoom,
      leaveChamaRoom,
      sendMessage,
      notifyContribution
    }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext
