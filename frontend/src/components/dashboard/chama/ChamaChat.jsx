import React, { useState, useEffect, useContext, useRef } from 'react'
import { ChamaContext } from '../../../context/ChamaContext'
import { AuthContext } from '../../../context/AuthContext'
import { SocketContext } from '../../../context/SocketContext'
import { Form, Button } from 'react-bootstrap'
import { getMessages } from '../../../services/chamaService'
import './ChamaStyles.scss'

const ChamaChat = () => {
  const { selectedGroup } = useContext(ChamaContext)
  const { user } = useContext(AuthContext)
  const { socket, connected, joinChamaRoom, leaveChamaRoom, sendMessage } = useContext(SocketContext)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Load messages when group is selected
  useEffect(() => {
    if (selectedGroup) {
      setLoading(true)
      // Join the socket room for this group
      joinChamaRoom(selectedGroup._id)
      
      // Load existing messages
      const loadMessages = async () => {
        try {
          const groupMessages = await getMessages(selectedGroup._id)
          setMessages(groupMessages || [])
        } catch (error) {
          console.error('Error loading messages:', error)
        } finally {
          setLoading(false)
        }
      }
      
      loadMessages()
      
      // Clean up when component unmounts or group changes
      return () => {
        if (selectedGroup) {
          leaveChamaRoom(selectedGroup._id)
        }
      }
    }
  }, [selectedGroup, joinChamaRoom, leaveChamaRoom])

  // Listen for new messages
  useEffect(() => {
    if (socket && connected) {
      const handleNewMessage = (message) => {
        setMessages(prevMessages => [...prevMessages, message])
      }
      
      socket.on('newMessage', handleNewMessage)
      
      return () => {
        socket.off('newMessage', handleNewMessage)
      }
    }
  }, [socket, connected])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() && selectedGroup && user) {
      sendMessage(selectedGroup._id, newMessage.trim())
      setNewMessage('')
    }
  }

  if (!selectedGroup) {
    return <div className="select-group-prompt">Select a Chama group to start chatting</div>
  }

  return (
    <div className="chama-chat">
      <div className="chat-header">
        <h4>{selectedGroup.name} - Chat</h4>
      </div>
      
      <div className="messages-container">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="no-messages">No messages yet. Start the conversation!</div>
        ) : (
          <div className="messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender === user?.uid ? 'sent' : 'received'}`}
              >
                <div className="message-content">{message.content}</div>
                <div className="message-meta">
                  <span className="message-sender">
                    {message.sender === user?.uid ? 'You' : message.senderName || 'Member'}
                  </span>
                  <span className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <Form className="message-form" onSubmit={handleSendMessage}>
        <Form.Group className="message-input-group">
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!connected}
          />
          <Button 
            variant="primary" 
            type="submit" 
            disabled={!connected || !newMessage.trim()}
          >
            Send
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ChamaChat
