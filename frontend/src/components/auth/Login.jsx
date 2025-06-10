import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { FaGoogle, FaEnvelope, FaLock, FaPhone, FaArrowRight } from 'react-icons/fa'
import Logo from '../../assets/Logo.png'
import './AuthStyles.scss'
import WelcomeModal from '../common/WelcomeModal'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationId, setVerificationId] = useState(null)
  const [loginMethod, setLoginMethod] = useState('email') // 'email' or 'phone'
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  
  const { login, loginWithGoogle, setupRecaptcha } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const userCredential = await login(email, password)
      setShowWelcomeModal(true) // Show welcome modal after successful login
      // Navigate after modal is closed (handled in the modal component)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const userCredential = await loginWithGoogle()
      setShowWelcomeModal(true) // Show welcome modal after successful login
      // Navigate after modal is closed (handled in the modal component)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handlePhoneNumberSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const confirmationResult = await setupRecaptcha(phoneNumber)
      setVerificationId(confirmationResult)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationCodeSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      await verificationId.confirm(verificationCode)
      setShowWelcomeModal(true) // Show welcome modal after successful login
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
            <h2>Login to SentiSmart</h2>
            <p>Welcome back! Please enter your details</p>
          </div>
          
          <div className="auth-tabs">
            <button 
              className={loginMethod === 'email' ? 'active' : ''} 
              onClick={() => setLoginMethod('email')}
            >
              <FaEnvelope /> Email Login
            </button>
            <button 
              className={loginMethod === 'phone' ? 'active' : ''} 
              onClick={() => setLoginMethod('phone')}
            >
              <FaPhone /> Phone Login
            </button>
          </div>
          
          {loginMethod === 'email' ? (
            <form onSubmit={handleEmailLogin} className="auth-form">
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
                  placeholder="Enter your password"
                  required 
                />
              </div>
              <button type="submit" className="auth-button primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'} {!loading && <FaArrowRight />}
              </button>
            </form>
          ) : (
            <div className="auth-form">
              {!verificationId ? (
                <form onSubmit={handlePhoneNumberSubmit}>
                  <div className="form-group">
                    <label>
                      <FaPhone className="input-icon" />
                      Phone Number (with country code)
                    </label>
                    <input 
                      type="tel" 
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)} 
                      placeholder="+254700000000" 
                      required 
                    />
                  </div>
                  <div id="recaptcha-container" className="recaptcha-container"></div>
                  <button type="submit" className="auth-button primary" disabled={loading}>
                    {loading ? 'Sending code...' : 'Send Verification Code'} {!loading && <FaArrowRight />}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerificationCodeSubmit}>
                  <div className="form-group">
                    <label>Verification Code</label>
                    <input 
                      type="text" 
                      value={verificationCode} 
                      onChange={(e) => setVerificationCode(e.target.value)} 
                      placeholder="Enter verification code"
                      required 
                    />
                  </div>
                  <button type="submit" className="auth-button primary" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify Code'} {!loading && <FaArrowRight />}
                  </button>
                </form>
              )}
            </div>
          )}
          
          <div className="auth-divider">
            <span>OR</span>
          </div>
          
          <button onClick={handleGoogleLogin} className="auth-button google" disabled={loading}>
            <FaGoogle /> Login with Google
          </button>
          
          {error && <p className="auth-error">{error}</p>}
          
          <p className="auth-redirect">
            Don't have an account? <Link to="/auth/signup">Sign up</Link>
          </p>
        </div>
        
        <div className="auth-image">
          <div className="auth-image-content">
            <h2>Manage Your Finances Smartly</h2>
            <p>Track expenses, save money, and achieve your financial goals with SentiSmart.</p>
          </div>
        </div>
      </div>

      {/* Welcome Back Modal */}
      <WelcomeModal
        show={showWelcomeModal}
        onClose={handleModalClose}
        title="Welcome Back to"
        message="We're glad to see you again! Your financial journey continues with personalized insights and smart recommendations waiting for you."
        userName={email.split('@')[0] || 'Valued Customer'}
        isNewUser={false}
      />
    </>
  )
}

export default Login
