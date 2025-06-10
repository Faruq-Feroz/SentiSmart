import React, { createContext, useState } from 'react'

// Create the context
export const NotificationContext = createContext()

// Create the provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    setNotifications([...notifications, notification])
  }

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
