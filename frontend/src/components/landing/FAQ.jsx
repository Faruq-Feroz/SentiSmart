import React, { useState } from 'react'
import styles from './FAQ.module.scss'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "What is the Sentismart Advisor?",
      answer: "Sentismart Advisor helps you manage your money wisely. You can track your salary, record expenses, set savings goals, and get smart financial advice — all in one place."
    },
    {
      question: "How can this platform help me manage my finances?",
      answer: "You'll be able to enter your income and spending, get personalized money tips, keep an eye on your savings progress, and understand where your money goes each month."
    },
    {
      question: "Do I need an account to use the dashboard?",
      answer: "Yes. You'll need to sign up or log in so your financial data stays secure and you can access your personal dashboard anytime."
    },
    {
      question: "Will I receive financial advice or tips?",
      answer: "Absolutely! The dashboard gives daily money tips and personal suggestions like how to save more, spend smarter, or adjust your budget based on your activity."
    },
    {
      question: "Can I get a report of my monthly budget?",
      answer: "Yes. You can download a full monthly report showing your income, expenses, savings, and helpful suggestions — perfect for reviewing your progress."
    },
    {
      question: "What are Chama groups and how do they work here?",
      answer: "Chama groups allow you to team up with up to 3 friends to save money together. You can track everyone's contributions and work toward shared financial goals."
    },
    {
      question: "Can I make payments or contributions through the platform?",
      answer: "Yes. You can pay for things like rent or group contributions directly through the dashboard and keep track of your transactions easily."
    },
    {
      question: "Who can use this platform?",
      answer: "It's designed for youth, students, workers, and anyone looking to get better with their money. Whether you earn daily or monthly, it helps you stay on top of your finances."
    }
  ]

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <p className={styles.sectionSubtitle}>Everything you need to know about Sentismart Advisor</p>
        
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
            >
              <div 
                className={styles.faqQuestion}
                onClick={() => toggleAccordion(index)}
              >
                <h3>{faq.question}</h3>
                <span className={styles.faqIcon}>
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              <div className={`${styles.faqAnswer} ${activeIndex === index ? styles.show : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ