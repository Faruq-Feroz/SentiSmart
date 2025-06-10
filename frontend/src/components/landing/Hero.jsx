import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './Hero.module.scss';

const Hero = () => {
  const images = [
    'https://i.pinimg.com/736x/ad/71/2d/ad712d7708bb0cc73700df5d77754901.jpg',
    'https://i.pinimg.com/736x/1a/59/79/1a5979ad4ad336d82821dea32ade9e86.jpg',
    'https://i.pinimg.com/736x/06/67/c4/0667c45481924dc56ec1b20f5690988a.jpg'
  ];

  return (
    <Container fluid className={styles.heroSection}>
      <Row className={styles.heroRow}>
        {/* Text content - always on the left */}
        <Col md={6} className={styles.heroLeft}>
          <h1>Smart Financial Management</h1>
          <h3>Reimagine your financial future: Smart tools to budget wisely, save effectively, and grow together</h3>
          <Button className={styles.ctaButton} href='/auth/signup'>Get Started Free</Button>
        </Col>
        {/* Images - always on the right */}
        <Col md={6} className={styles.heroRight}>
          <div className={styles.imageGrid}>
            <img 
              src={images[0]} 
              alt="Financial management 1" 
              className={styles.heroImage}
            />
            <img 
              src={images[1]} 
              alt="Financial management 2" 
              className={styles.heroImage}
            />
            <img 
              src={images[2]} 
              alt="Financial management 3" 
              className={styles.heroImage}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;