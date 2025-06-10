import React from 'react'

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <h2>What Our Users Say</h2>
      <div className="testimonials-container">
        <div className="testimonial-card">
          <div className="quote">"SentiSmart helped me save enough for my first laptop in just 3 months!"</div>
          <div className="user-info">
            <div className="user-avatar"></div>
            <div>
              <h4>James Mwangi</h4>
              <p>University Student</p>
            </div>
          </div>
        </div>
        <div className="testimonial-card">
          <div className="quote">"I finally understand where my salary goes each month. The insights are eye-opening!"</div>
          <div className="user-info">
            <div className="user-avatar"></div>
            <div>
              <h4>Sarah Kamau</h4>
              <p>Young Professional</p>
            </div>
          </div>
        </div>
        <div className="testimonial-card">
          <div className="quote">"Our Chama group uses SentiSmart to track our contributions. It's made everything transparent."</div>
          <div className="user-info">
            <div className="user-avatar"></div>
            <div>
              <h4>David Ochieng</h4>
              <p>Entrepreneur</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials