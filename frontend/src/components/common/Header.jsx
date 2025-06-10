import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/Logo.png";
import styles from './Header.module.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.modernNavbar}>
      <div className={styles.navbarContainer}>
        {/* Logo Section */}
        <div className={styles.navbarBrand}>
          <Link to="/">
            <img 
              src={Logo}
              alt="SentiSmart Logo"
              className={styles.navbarLogo}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <a href="#" className={styles.navLink}>Home</a>
          <a href="#how-it-works" className={styles.navLink}>How It Works</a>
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#benefits" className={styles.navLink}>Benefits</a>
          <a href="#mpesa" className={styles.navLink}>M-PESA</a>
          <a href="#faq" className={styles.navLink}>FAQ</a>
          
          {/* Auth Buttons */}
          <div className={styles.authButtons}>
            <Link to="/auth/login" className={styles.signInButton}>Sign In</Link>
            <Link to="/auth/signup" className={styles.signUpButton}>Create Account</Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.mobileMenuToggle}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`}></span>
        </button>

        {/* Mobile Navigation */}
        <div className={`${styles.mobileNav} ${isMenuOpen ? styles.active : ''}`}>
          <a href="#" className={styles.mobileNavLink}>Home</a>
          <a href="#how-it-works" className={styles.mobileNavLink}>How It Works</a>
          <a href="#features" className={styles.mobileNavLink}>Features</a>
          <a href="#benefits" className={styles.mobileNavLink}>Benefits</a>
          <a href="#mpesa" className={styles.mobileNavLink}>M-PESA</a>
          <a href="#faq" className={styles.mobileNavLink}>FAQ</a>
          
          <div className={styles.mobileAuthButtons}>
            <Link to="/auth/login" className={styles.signInButton}>Sign In</Link>
            <Link to="/auth/signup" className={styles.signUpButton}>Create Account</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;