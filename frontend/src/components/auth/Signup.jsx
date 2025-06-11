import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaArrowRight } from 'react-icons/fa'
import Logo from '../../assets/Logo.png'
import './AuthStyles.scss'
import WelcomeModal from '../common/WelcomeModal'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  
  const { signup, loginWithGoogle } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }
    
    setLoading(true)
    setError(null)
    
    try {
      await signup(email, password, name)
      setShowWelcomeModal(true) // Show welcome modal after successful signup
      // Navigate after modal is closed (handled in the modal component)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setLoading(true)
    setError(null)
    
    try {
      await loginWithGoogle()
      setShowWelcomeModal(true) // Show welcome modal after successful signup
      // Navigate after modal is closed (handled in the modal component)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleModalClose = () => {
    setShowWelcomeModal(false)
    navigate('/dashboard') // Navigate to dashboard after modal is closed
  }

  return (
    <>
      <div className="auth-container">
        <div className="auth-form-container">
          <div className="auth-header">
            <img src={Logo} alt="SentiSmart Logo" className="auth-logo" />
            <h2>Create a SentiSmart Account</h2>
            <p>Join thousands of users managing their finances smartly</p>
          </div>
          
          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label>
                <FaUser className="input-icon" />
                Full Name
              </label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your full name"
                required 
              />
            </div>
            <div className="form-group">
              <label>
                <FaEnvelope className="input-icon" />
                Email
              </label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
                required 
              />
            </div>
            <div className="form-group">
              <label>
                <FaLock className="input-icon" />
                Password
              </label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Create a password"
                required 
              />
            </div>
            <div className="form-group">
              <label>
                <FaLock className="input-icon" />
                Confirm Password
              </label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Confirm your password"
                required 
              />
            </div>
            <button type="submit" className="auth-button primary" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'} {!loading && <FaArrowRight />}
            </button>
          </form>
          
          <div className="auth-divider">
            <span>OR</span>
          </div>
          
          <button onClick={handleGoogleSignup} className="auth-button google" disabled={loading}>
            <FaGoogle /> Sign up with Google
          </button>
          
          {error && <p className="auth-error">{error}</p>}
          
          <p className="auth-redirect">
            Already have an account? <Link to="/auth/login">Login</Link>
          </p>
        </div>
        
        <div className="auth-image">
          <div className="auth-image-content">
            <h2>Take Control of Your Financial Future</h2>
            <p>Join SentiSmart to track expenses, save money, and achieve your financial goals.</p>
          </div>
        </div>
      </div>

      {/* Welcome New User Modal */}
      <WelcomeModal
        show={showWelcomeModal}
        onClose={handleModalClose}
        title="Welcome to SentiSmart"
        message="Congratulations on taking the first step toward financial freedom! We're excited to help you manage your finances smartly and achieve your goals."
        isNewUser={true}
      />
    </>
  )
}

export default Signup
