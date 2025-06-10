import { FaChartLine, FaWallet, FaBullseye, FaUsers, FaMobile, FaGraduationCap } from "react-icons/fa"
import styles from "./Benefits.module.scss"

const Benefits = () => {
  const benefits = [
    {
      icon: <FaChartLine />,
      title: "Smart Insights",
      description: "Get personalized recommendations to improve your financial habits and make informed decisions.",
    },
    {
      icon: <FaWallet />,
      title: "Track Every Shilling",
      description: "Know exactly where your money goes with detailed expense tracking and categorization.",
    },
    {
      icon: <FaBullseye />,
      title: "Achieve Goals Faster",
      description: "Set and reach savings goals with progress tracking and milestone celebrations.",
    },
    {
      icon: <FaUsers />,
      title: "Community Savings",
      description: "Join Chama groups to save together and motivate each other towards financial success.",
    },
    {
      icon: <FaMobile />,
      title: "M-PESA Integration",
      description: "Seamlessly manage payments and contributions through M-PESA integration.",
    },
    {
      icon: <FaGraduationCap />,
      title: "Financial Education",
      description: "Access comprehensive tips and guides to improve your financial literacy.",
    },
  ]

  return (
    <section id="benefits" className={styles.benefitsSection}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <h2 className={styles.sectionTitle}>Why Choose SentiSmart</h2>
          <p className={styles.sectionSubtitle}>
            Discover the powerful features that make SentiSmart the perfect companion for your financial journey
          </p>
        </div>

        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{benefit.icon}</div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitText}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
