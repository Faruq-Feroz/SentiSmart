import React from 'react';

const ImageScroller = () => {
  const images = [
    "https://www.africa-newsroom.com/files/large/83379a847dc9ee6",
    "https://pbs.twimg.com/profile_images/1833038537496657920/2SjL_XkT_400x400.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/0/0b/M-PESA.png"
  ];

  // Duplicate images to create a seamless loop
  const allImages = [...images, ...images, ...images];

  return (
    <div className="scroller-container">
      <div className="powered-by-text">
        Powered By
      </div>
      
      <div className="scroller-wrapper">
        <div className="scroller-track">
          {allImages.map((image, index) => (
            <div key={index} className="scroller-item">
              <img
                src={image}
                alt={`Partner ${index % images.length + 1}`}
                className="scroller-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200x120/6B7280/FFFFFF?text=Error";
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .scroller-container {
          width: 100%;
          overflow: hidden;
          padding: 2rem 0;
          background-color: #f9fafb;
          position: relative;
        }
        
        .powered-by-text {
          text-align: center;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 2rem;
          color: #374151;
        }
        
        .scroller-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        
        .scroller-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        
        .scroller-item {
          flex-shrink: 0;
        }
        
        .scroller-image {
          height: 120px;
          width: auto;
          max-width: 240px;
          object-fit: contain;
          border-radius: 8px;
          background: white;
          padding: 15px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        .scroller-image:hover {
          transform: scale(1.05);
        }
        
        /* Pause animation on hover */
        .scroller-wrapper:hover .scroller-track {
          animation-play-state: paused;
        }
        
        @media (max-width: 768px) {
          .scroller-image {
            height: 80px;
            max-width: 160px;
            padding: 10px;
          }
          .scroller-track {
            gap: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .scroller-image {
            height: 60px;
            max-width: 120px;
            padding: 8px;
          }
          .scroller-track {
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageScroller;