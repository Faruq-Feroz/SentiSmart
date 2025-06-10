import React from 'react'
import styles from './Features.module.scss'
import { Container } from 'react-bootstrap'

const Features = () => {
  return (
    <section id="features" className={styles['moveable-tips']}>
      <Container className={styles.container}>
        <div className={styles.sectionSubtitle}>What We Offer</div>
        <h2 className={styles.sectionTitle}>Smart Financial Features</h2>
        
        <div className={styles.featuresGrid}>
          {/* Feature 1 */}
          <div className={styles['tip-card']}>
            <div className={styles['tip-icon']}>
              <i className="fas fa-chart-pie"></i>
            </div>
            <h3 className={styles['tip-title']}>Budget Management</h3>
            <p className={styles['tip-text']}>Track expenses and get smart recommendations for better financial habits</p>
          </div>
          
          {/* Feature 2 */}
          <div className={styles['tip-card']}>
            <div className={styles['tip-icon']}>
              <i className="fas fa-piggy-bank"></i>
            </div>
            <h3 className={styles['tip-title']}>Savings Goals</h3>
            <p className={styles['tip-text']}>Set monthly savings targets and track your progress with visual indicators</p>
          </div>
          
          {/* Feature 3 */}
          <div className={styles['tip-card']}>
            <div className={styles['tip-icon']}>
              <i className="fas fa-users"></i>
            </div>
            <h3 className={styles['tip-title']}>Chama Groups</h3>
            <p className={styles['tip-text']}>Form savings groups with friends and track contributions in real-time</p>
          </div>
          
          {/* Feature 4 */}
          <div className={styles['tip-card']}>
            <div className={styles['tip-icon']}>
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3 className={styles['tip-title']}>M-PESA Integration</h3>
            <p className={styles['tip-text']}>Simulate payments, contributions, and donations with M-PESA sandbox</p>
          </div>
          
          {/* Feature 5 */}
          <div className={styles['tip-card']}>
            <div className={styles['tip-icon']}>
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3 className={styles['tip-title']}>Financial Insights</h3>
            <p className={styles['tip-text']}>Get personalized spending patterns and actionable financial advice</p>
          </div>
          
          {/* Feature 6 */}
          <div className={styles['tip-card']}>
            <div className={styles['tip-icon']}>
              <i className="fas fa-file-pdf"></i>
            </div>
            <h3 className={styles['tip-title']}>PDF Reports</h3>
            <p className={styles['tip-text']}>Download comprehensive financial summaries and budget templates</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Features