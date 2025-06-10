import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CallToAction.module.scss'

const CallToAction = () => {
  return (
    <section id="cta" className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Take Control of Your Finances?</h2>
          <p className={styles.ctaText}>Join thousands of users who are managing their money smarter with SentiSmart</p>
          <div className={styles.ctaButtons}>
            <Link to="/auth/signup" className={`${styles.ctaButton} ${styles.primary}`}>Create Free Account</Link>
            <Link to="/auth/login" className={`${styles.ctaButton} ${styles.secondary}`}>Sign In</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction