import React from 'react'
import styles from './MPESAIntegration.module.scss'
import { FaMobileAlt, FaMoneyBillWave, FaUsers, FaExchangeAlt, FaChartLine } from 'react-icons/fa'
import { BsShieldCheck } from 'react-icons/bs'
// Import an image if you have one
// import mpesaImage from '../../assets/mpesa-image.png'

const MPESAIntegration = () => {
  return (
    <section id="mpesa" className={styles.mpesaSection}>
      <div className={styles.container}>
        <div className={styles.mpesaContent}>
          <h2 className={styles.sectionTitle}>Seamless M-PESA Integration</h2>
          <p className={styles.sectionSubtitle}>Easily manage your finances with integrated M-PESA</p>
          
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}><FaMobileAlt /></span>
              Pay rent and bill
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}><FaUsers /></span>
              Track Chama contributions
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}><FaMoneyBillWave /></span>
              Send and receive donations
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}><FaChartLine /></span>
              Monitor all transactions in one place
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}><FaExchangeAlt /></span>
              Instant transaction 
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}><BsShieldCheck /></span>
              Secure transactions
            </li>
          </ul>
          
          <button className={styles.ctaButton}>Try M-PESA Features</button>
        </div>
        
        <div className={styles.mpesaImage}>
          <div className={styles.imageContainer}>
            {/* Replace this with an actual image */}
            <img 
              src="https://www.alxafrica.com/wp-content/uploads/2024/11/african-quality-map.svg" 
              alt="M-PESA Integration" 
              className={styles.actualImage} 
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MPESAIntegration