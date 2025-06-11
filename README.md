# SentiSmart Financial Partner

**A Smart Companion for Every Financial Move — Save, Spend, Share, and Succeed**

[![Live Demo](https://img.shields.io/badge/🚀_LIVE-DEMO-00FF7F?style=for-the-badge&labelColor=blue)](https://senti-smart.vercel.app/)
[![Our Story](https://img.shields.io/badge/📖_Our_Story-Group_21_Journey-32CD32?style=for-the-badge&labelColor=blue)](./frontend/README.md)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)
[![M-PESA](https://img.shields.io/badge/M--PESA-Integrated-orange)](https://developer.safaricom.co.ke/)

<div align="center">
  <img src="./Screenshots/Home.png" alt="SentiSmart Dashboard" width="100%" />
  <p><em>Experience SentiSmart in action - <a href="https://senti-smart.vercel.app/">Visit Live Demo</a></em></p>
</div>

<br />

> **SentiSmart isn't just an app—it's a financial revolution that transforms how everyone, especially youth, manages money, builds communities, and achieves dreams.**

*Proudly developed with support from **Power Learn Project** and **Safaricom** through the S-hook Scholarship Program*

<br />

## Overview

**60% of African youth lack basic financial literacy.** Traditional financial systems exclude millions. Savings groups (Chamas) operate on trust alone, without digital tools. Financial advice is expensive and inaccessible.

**SentiSmart changes everything.**

Our platform combines AI-powered financial intelligence, real-time community savings, seamless M-PESA integration, and visual financial insights to create a comprehensive solution for modern financial management.

<br />

## Key Features

### 🧠 AI-Powered Financial Intelligence
- Custom rule engine delivers personalized financial advice (no external APIs needed)
- Smart recommendations: *"You're spending 40% on transport—try carpooling to save KES 2,000/month"*
- Daily rotating financial tips tailored to user behavior
- Goal-specific recommendations and milestone tracking

### 🤝 Real-Time Community Savings (Chama)
- WebSocket-powered group savings with live chat
- Transparent contribution tracking with celebration animations
- Smart member limits (max 4 per group) for accountability
- Social campaign creation with sharing capabilities

### 💳 Seamless M-PESA Integration
- One-click payments for rent, bills, and group contributions
- Real-time transaction verification and logging
- Secure payment processing with robust error handling
- STK Push integration for smooth user experience

### 📊 Visual Financial Intelligence
- Interactive dashboards with progress bars and pie charts
- Downloadable PDF reports for monthly budgets
- Spending pattern analysis with actionable insights
- Goal tracking with milestone celebrations

### 💰 Personal Finance Management
- Smart expense categorization with quick-tag system
- Budget templates for Students, Employees, and Entrepreneurs
- Automated reminders and notifications
- Historical analysis and budget comparison tools
- Emergency fund calculator with personalized advice

<br />

## Technical Stack

### Frontend
```javascript
React 18 + Vite + Modern Stack
├── React.js (Hooks, Context API, useReducer)
├── Material-UI + Framer Motion + SASS
├── Chart.js + React-Chartjs-2 for visualizations
├── Socket.IO-client for real-time features
├── Firebase SDK for authentication
├── Axios for API management
└── PDF generation (jsPDF + html2canvas)
```

### Backend
```javascript
Node.js + Express + MongoDB
├── Express.js with modular routing
├── MongoDB (Mongoose) with optimized schemas
├── Firebase Admin SDK for secure authentication
├── Socket.IO for real-time communication
├── M-PESA Daraja API integration
├── Custom rule engine for AI advice
└── Comprehensive error handling & logging
```

### Security & Performance
- Firebase Authentication (Email, Google, Phone)
- JWT Token Management with secure refresh
- M-PESA API Security with callback verification
- Rate Limiting and CORS protection
- Data validation at all entry points
- 95%+ test coverage on critical paths

<br />

## Project Structure

```
sentismart/
├── backend/
│   ├── src/
│   │   ├── config/        # Firebase, M-PESA, DB configurations
│   │   ├── controllers/   # Business logic & AI engine
│   │   ├── middleware/    # Authentication, error handling, CORS
│   │   ├── models/        # Mongoose schemas (User, Chama, etc.)
│   │   ├── routes/        # RESTful API endpoints
│   │   ├── utils/         # Helper functions & rule engine
│   │   └── server.js      # Express + Socket.IO entry point
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── context/       # State management (Auth, Budget, Socket)
│   │   ├── services/      # API layer & utilities
│   │   ├── styles/        # SASS modules & themes
│   │   └── App.jsx        # Main application
└── README.md
```

<br />

## API Documentation

### Authentication
```http
POST /api/auth/register    # User registration via Firebase
GET  /api/auth/me         # Current user profile
```

### AI Advice Engine
```http
GET /api/advice/recommendations  # Personalized financial advice
GET /api/advice/daily-tips      # Daily rotating tips
GET /api/advice/goal/:type      # Goal-specific recommendations
```

### Savings & Goals
```http
GET    /api/savings           # All user goals
POST   /api/savings           # Create new goal
PUT    /api/savings/:id       # Update goal progress
DELETE /api/savings/:id       # Remove goal
```

### Chama Community
```http
GET  /api/chama                    # User's groups
POST /api/chama                    # Create new group
POST /api/chama/:id/contributions  # Add contribution
GET  /api/chama/:id/messages       # Group chat history
```

### M-PESA Integration
```http
POST /api/mpesa/stkpush      # Initiate STK push payment
POST /api/mpesa/billpayment  # Pay utility bills
POST /api/mpesa/callback     # Payment verification webhook
GET  /api/mpesa/query        # Transaction status check
```

<br />

## Getting Started

### Prerequisites
- Node.js 14+
- MongoDB Atlas account
- Firebase project
- M-PESA Sandbox credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sentismart.git
   cd sentismart
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment setup**
   ```bash
   # Backend environment
   cp backend/.env.example backend/.env
   
   # Frontend environment
   cp frontend/.env.example frontend/.env
   ```

4. **Configure services**
   - **Firebase**: Add your config to both frontend and backend
   - **MongoDB**: Update connection string in `backend/.env`
   - **M-PESA**: Add Consumer Key, Consumer Secret, and Passkey

5. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually
   npm run dev:backend   # Port 5000
   npm run dev:frontend  # Port 3000
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Socket.IO: Connected automatically

<br />

## Testing

```bash
# Run all tests
npm run test

# Backend tests (Jest + Supertest)
npm run test:backend

# Frontend tests (React Testing Library)
npm run test:frontend

# Generate coverage report
npm run test:coverage
```

**Quality Metrics:**
- 95%+ test coverage on critical paths
- Performance monitoring with Lighthouse scores
- Security auditing with npm audit
- Code quality with ESLint + Prettier

<br />

## Deployment

The application is deployed on Vercel with the following setup:
- Frontend: Vercel deployment with environment variables
- Backend: Vercel serverless functions
- Database: MongoDB Atlas
- Real-time: Socket.IO with adapter for scaling

<br />

## Impact & Market Opportunity

### Target Demographics
- **Youth (18-35)** seeking financial empowerment
- **University Students** managing allowances and expenses
- **Young Professionals** building emergency funds
- **Community Groups** organizing savings and investments

### Market Statistics
- **500M+ African youth** need financial literacy tools
- **50M+ M-PESA active users** with growing adoption
- **$12B+ community savings market** opportunity
- **60% of African youth** lack basic financial literacy

### Future Roadmap
- Native mobile apps (React Native)
- AI voice assistant for financial coaching
- Multi-currency support for regional expansion
- Advanced analytics with machine learning
- Financial institution integration
- Gamified learning modules with certificates

<br />

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution
- Bug fixes and performance improvements
- New features and user experience enhancements
- Testing and quality assurance
- Documentation and tutorials
- Localization for different African markets

<br />

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<br />

## Acknowledgements

- **Power Learn Project** for mentorship and technical guidance
- **Safaricom** for S-hook Scholarship and M-PESA API access
- **Open Source Community** for amazing libraries and tools
- **African Tech Ecosystem** for inspiration and support
- **Beta Testers** who provided invaluable feedback

<br />

## Links

- **🚀 [Live Demo](https://senti-smart.vercel.app/)**
- **📖 [Documentation](your-docs-url)**
- **💬 [Community Discord](your-discord-url)**
- **📧 [Contact](mailto:your.email@example.com)**

---

<div align="center">
  <p><strong>Built with ❤️ in Kenya for Africa and the World</strong></p>
  <p><em>SentiSmart - Transforming Financial Lives, One Smart Decision at a Time</em></p>
</div>
