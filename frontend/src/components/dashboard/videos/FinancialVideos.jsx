import React from 'react'
import './VideosStyles.css'

const FinancialVideos = () => {
  // Sample financial education videos from YouTube
  const videos = [
    {
      id: 1,
      title: 'Budgeting Basics',
      description: 'Learn the fundamentals of creating and maintaining a budget',
      embedId: 'sVKQn2I4HDM',  // YouTube video ID
      category: 'Budgeting'
    },
    {
      id: 2,
      title: 'Investing for Beginners',
      description: 'Start your investment journey with these simple tips',
      embedId: 'gFQNPmLKj1k',
      category: 'Investing'
    },
    {
      id: 3,
      title: 'Emergency Fund Explained',
      description: 'Why you need an emergency fund and how to build one',
      embedId: 'fVToMS2Q3XQ',
      category: 'Savings'
    },
    {
      id: 4,
      title: 'Debt Reduction Strategies',
      description: 'Effective methods to pay down debt faster',
      embedId: 'PBq_FSjiAI0',
      category: 'Debt Management'
    },
    {
      id: 5,
      title: 'Retirement Planning 101',
      description: 'Start planning for retirement no matter your age',
      embedId: 'zdXMlNSBbsg',
      category: 'Retirement'
    },
    {
      id: 6,
      title: 'Understanding Credit Scores',
      description: 'How credit scores work and how to improve yours',
      embedId: 'Hwy9KPhDClI',
      category: 'Credit'
    }
  ]

  return (
    <div className="videos-container">
      <h2 className="section-title">Financial Education Videos</h2>
      <p className="section-description">Watch these videos to improve your financial knowledge and skills</p>
      
      <div className="videos-grid">
        {videos.map(video => (
          <div key={video.id} className="video-card">
            <div className="video-embed">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.embedId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              <span className="video-category">{video.category}</span>
              <p className="video-description">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FinancialVideos