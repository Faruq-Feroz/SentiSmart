import { Container, Row, Col } from "react-bootstrap"
import styles from "./HowItWorks.module.scss"

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Input Your Income & Expenses",
      description:
        "Easily track your salary and daily expenses with quick category tags. Our intuitive interface makes financial tracking simple.",
      image: "https://i.pinimg.com/736x/9d/bc/15/9dbc15b409b960bb2630e2a12b8e09d2.jpg",
    },
    {
      number: 2,
      title: "Get Smart Recommendations",
      description:
        "Receive personalized financial advice based on your spending patterns. Our smart engine helps you make better financial decisions.",
      image: "https://i.pinimg.com/736x/24/06/70/240670a31fc1ee485622f1ac3c0ff4c7.jpg",
    },
    {
      number: 3,
      title: "Track Goals & Save",
      description:
        "Set savings goals and track your progress with visual indicators. Watch your savings grow and celebrate your financial milestones.",
      image: "https://i.pinimg.com/736x/79/b2/b6/79b2b62f6744f835bf3e2ec88c57d058.jpg",
    },
    {
      number: 4,
      title: "Join Community Savings",
      description:
        "Create or join Chama groups to save together with friends. Collaborative saving makes achieving financial goals easier and more fun.",
      image: "https://i.pinimg.com/736x/af/5b/6d/af5b6d761154f4e8b536ffd936e59730.jpg",
    },
  ]

  return (
    <section id="how-it-works" className={styles.section}>
      <Container>
        {/* Header */}
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className={styles.sectionSubtitle}>Our Process</div>
            <h2 className={styles.sectionTitle}>How SentiSmart Works</h2>
          </Col>
        </Row>

        {/* Grid Container - 2x2 Layout */}
        <div className={styles.gridContainer}>
          <Row className={styles.gridRow}>
            {steps.map((step, index) => (
              <Col key={step.number} md={6} className={styles.gridItem}>
                <div className={styles.imageOverlay}>
                  <img src={step.image || "/placeholder.svg"} alt={step.title} />
                  <div className={styles.overlay}></div>
                  <div className={styles.content}>
                    <div className={styles.stepNumber}>{step.number}</div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* CTA Button */}
        <div className={styles.buttonContainer}>
          <a href="#get-started" className={styles.ctaButton}>
            Get Started Today
          </a>
        </div>
      </Container>
    </section>
  )
}

export default HowItWorks
