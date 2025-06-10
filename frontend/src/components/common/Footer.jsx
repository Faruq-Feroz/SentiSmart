import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Column 1: Logo & Description */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerLogo}>SentiSmart</h3>
            <p className={styles.footerTagline}>Your financial companion for smarter money management and insights</p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/#features">Features</Link></li>
              <li><Link to="/#how-it-works">How It Works</Link></li>
              <li><Link to="/#faq">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Legal */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>Legal</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>Contact</h4>
            <ul className={styles.footerLinks}>
              <li><a href="mailto:support@sentismart.com">support@sentismart.com</a></li>
              <li><a href="tel:+254700000000">+254 700 000 000</a></li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom: Copyright & Social */}
        <div className={styles.footerBottom}>
          <div className={styles.footerCopyright}>
            &copy; {currentYear} SentiSmart. All rights reserved.
          </div>
          <div className={styles.socialLinks}>
            <a href="https://twitter.com" className={styles.socialIcon} aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com" className={styles.socialIcon} aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" className={styles.socialIcon} aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" className={styles.socialIcon} aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer