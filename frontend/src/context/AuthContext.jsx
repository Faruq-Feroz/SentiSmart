import React, { createContext, useState, useEffect } from 'react'
import { 
  auth, 
  googleProvider 
} from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';

// Create the context
export const AuthContext = createContext()

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsAuthenticated(!!currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Email/Password signup
  const signup = async (email, password, displayName) => {
    try {
      setError(null)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update profile with display name
      if (displayName) {
        await updateProfile(userCredential.user, { displayName })
      }
      
      return userCredential.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Email/Password login
  const login = async (email, password) => {
    try {
      setError(null)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Google login
  const loginWithGoogle = async () => {
    try {
      setError(null)
      const result = await signInWithPopup(auth, googleProvider)
      return result.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Phone number authentication
  const setupRecaptcha = (phoneNumber) => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible'
    })
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
  }

  // Logout
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Reset password
  const resetPassword = async (email) => {
    try {
      setError(null)
      await sendPasswordResetEmail(auth, email)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading,
      error,
      signup,
      login, 
      loginWithGoogle,
      setupRecaptcha,
      logout,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
