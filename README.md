# 🚀 SentiSmart Financial Partner

**_A Smart Companion for Every Financial Move — Save, Spend, Share, and Succeed_**

## Live Demo

[![Pitch Deck](https://img.shields.io/badge/📖%20Pitch%20Deck-Presentation-800080?style=for-the-badge&labelColor=800080&logo=book&logoColor=white)](https://www.canva.com/design/DAGp5CzSsKo/9u6kIJCvQXMJ6IrIWS3tVw/edit?utm_content=DAGp5CzSsKo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
[![Live Demo](https://img.shields.io/badge/🚀%20LIVE-DEMO-00FF7F?style=for-the-badge&labelColor=FF6B35&logo=rocket&logoColor=white)](https://senti-smart.vercel.app/)
[![Screenshots](https://img.shields.io/badge/📸%20Screenshots-Gallery-FF1493?style=for-the-badge&labelColor=FF1493&logo=image&logoColor=white)](./frontend/README.md)

### [![SentiSmart Live Demo](./Screenshots/Hero.png)](https://senti-smart.vercel.app/)
**✨ Experience SentiSmart in action - Click to visit! ✨**

[![MIT License](https://img.shields.io/badge/License-MIT-28a745?style=flat-square&logo=github)](https://choosealicense.com/licenses/mit/)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D14.0.0-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![M-PESA](https://img.shields.io/badge/M--PESA-Integrated-FF6B00?style=flat-square&logo=mobile)](https://developer.safaricom.co.ke/)

---

## 📋 Table of Contents

- [Smart Tech. Real Benefits](#-smart-tech-real-benefits)
- [The Problem We Solve](#-the-problem-we-solve)
- [What Makes Us Revolutionary](#-what-makes-us-revolutionary)
- [Core Features That Wow](#-core-features-that-wow)
- [Technical Excellence](#️-technical-excellence)
- [Clean Architecture](#-clean-architecture)
- [API Ecosystem](#-api-ecosystem)
- [Screenshots & Demo](#-screenshots--demo)
- [Quick Start Guide](#-quick-start-guide)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Social Impact & Scalability](#-social-impact--scalability)
- [Why SentiSmart Wins](#-why-sentismart-wins)

## 🔬 Smart Tech. Real Benefits


> ### *"SentiSmart isn't just an app—it's a financial revolution that transforms how everyone, especially youth, manages money, builds communities, and achieves dreams."*

## 🌟 The Problem We Solve

<div style="padding: 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; color: white; margin: 20px 0;">

**60% of African youth lack basic financial literacy.** Traditional financial systems exclude millions. Savings groups (Chamas) operate on trust alone, without digital tools. Financial advice is expensive and inaccessible.

<div align="center">
  <strong>🎯 SentiSmart changes everything.</strong>
</div>

</div>

## ⚡ What Makes Us Revolutionary

### 🧠 AI-Powered Financial Brain

- **Custom rule engine** delivers personalized financial advice (no external APIs needed)
- Smart recommendations: *"You're spending 40% on transport—try carpooling to save KES 2,000/month"*
- Daily rotating financial tips tailored to user behavior

### 🤝 Real-Time Community Savings (Chama)

- **WebSocket-powered** group savings with live chat
- **Transparent contribution tracking** with celebration animations
- **Smart member limits** (max 4 per group) for accountability
- **Social campaign creation** with sharing capabilities

### 💳 Seamless M-PESA Integration

- **One-click payments** for rent, bills, and group contributions
- **Real-time transaction verification** and logging
- **Secure payment processing** with robust error handling

### 📊 Visual Financial Intelligence

- **Interactive dashboards** with progress bars and pie charts
- **Downloadable PDF reports** for monthly budgets
- **Spending pattern analysis** with actionable insights
- **Goal tracking** with milestone celebrations

## 🎯 Core Features That Wow

### 💰 Personal Finance Mastery

- **Smart Expense Categorization** with quick-tag system
- **Budget Templates** for Students, Employees, Hustlers
- **Automated Reminders** ("Pay Rent on 5th", "Savings goal 80% complete!")
- **Historical Analysis** - track and compare past budgets
- **Emergency Fund Calculator** with personalized advice

### 👥 Community-Driven Savings (Chama)

- **Create/Join Groups** with real-time member management
- **Live Group Chat** with message persistence
- **Contribution Tracking** with progress visualization
- **Group Goals** with collective celebration logic
- **Member Activity Dashboard** with transparency features

### 🎯 Social Impact & Giving

- **Peer-to-Peer Donations** with transparent tracking
- **Campaign Creation** for causes and dreams
- **Social Media Integration** (share progress, invite friends)
- **Impact Visualization** ("You've helped Janet reach 80% of her book fund!")

### 🛠️ Technical Excellence

- **Frontend Powerhouse**

```javascript
// React 18 + Vite + Modern Stack
- React.js (Hooks, Context API, useReducer)
- Material-UI + Framer Motion + SASS
- Chart.js + React-Chartjs-2 for visualizations
- Socket.IO-client for real-time features
- Firebase SDK for authentication
- Axios for API management
- PDF generation (jsPDF + html2canvas)
```

<br>

### **Backend Architecture**

```javascript
// Node.js + Express + MongoDB
- Express.js with modular routing
- MongoDB (Mongoose) with optimized schemas
- Firebase Admin SDK for secure auth
- Socket.IO for real-time communication
- M-PESA Daraja API integration
- Custom rule engine for AI advice
- Comprehensive error handling & logging
```

<br>

### **Real-Time Features**

<div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; color: white; margin: 20px 0;">

✨ **WebSocket Architecture** for instant group updates  
✨ **Live Chat System** with message persistence  
✨ **Real-Time Notifications** across all connected devices  
✨ **Contribution Tracking** with immediate visual feedback

</div>

<br>

### **Security & Performance**

<div style="padding: 20px; background: rgba(40, 167, 69, 0.1); border-radius: 16px; border: 2px solid rgba(40, 167, 69, 0.2); margin: 20px 0;">

🔒 **Firebase Authentication** (Email, Google, Phone)  
🔒 **JWT Token Management** with secure refresh  
🔒 **M-PESA API Security** with callback verification  
🔒 **Rate Limiting** and **CORS** protection  
🔒 **Data Validation** at all entry points

</div>

<br>

---

<br>

## 📁 Clean Architecture

<br>

```
sentismart/
├── backend/
│   ├── src/
│   │   ├── config/        # Firebase, M-PESA, DB configs
│   │   ├── controllers/   # Business logic & AI engine
│   │   ├── middleware/    # Auth, error handling, CORS
│   │   ├── models/        # Mongoose schemas (User, Chama, etc.)
│   │   ├── routes/        # RESTful API endpoints
│   │   ├── utils/         # Helper functions & rule engine
│   │   └── server.js      # Express + Socket.IO entry
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

<br>

---

<br>

## 🚀 API Ecosystem

<br>

### **Authentication & User Management**

```http
POST /api/auth/register    # User registration via Firebase
GET  /api/auth/me         # Current user profile
```

<br>

### **AI-Powered Advice Engine**

```http
GET /api/advice/recommendations  # Personalized financial advice
GET /api/advice/daily-tips      # Daily rotating tips
GET /api/advice/goal/:type      # Goal-specific recommendations
```

<br>

### **Savings & Goals Management**

```http
GET    /api/savings           # All user goals
POST   /api/savings           # Create new goal
PUT    /api/savings/:id       # Update goal progress
DELETE /api/savings/:id       # Remove goal
```

<br>

### **Chama Community Features**

```http
GET  /api/chama                    # User's groups
POST /api/chama                    # Create new group
POST /api/chama/:id/contributions  # Add contribution
GET  /api/chama/:id/messages       # Group chat history
```

<br>

### **M-PESA Payment Integration**

```http
POST /api/mpesa/stkpush      # Initiate STK push
POST /api/mpesa/billpayment  # Pay utility bills
POST /api/mpesa/callback     # Payment verification
GET  /api/mpesa/query        # Transaction status
```

<br>

---

<br>

## 🎨 Screenshots & Demo

<br>

### **Dashboard Overview**

<div style="padding: 20px; border-radius: 16px; background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); margin: 16px 0;">

• Real-time budget visualization  
• Goal progress with animations  
• Quick expense entry with smart tags

</div>

<br>

### **Chama Group Interface**

<div style="padding: 20px; border-radius: 16px; background: linear-gradient(135deg, rgba(0, 212, 170, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%); margin: 16px 0;">

• Live contribution tracking  
• Group chat with emoji support  
• Member activity dashboard

</div>

<br>

### **Mobile Experience**

<div style="padding: 20px; border-radius: 16px; background: linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, rgba(255, 107, 53, 0.1) 100%); margin: 16px 0;">

• Touch-optimized interface  
• Offline capability  
• Push notifications

</div>

<br>

---

<br>

## ⚡ Quick Start Guide

<br>

### **Prerequisites**

<div style="display: grid; gap: 8px; padding: 16px; background: rgba(108, 117, 125, 0.1); border-radius: 12px; margin: 16px 0;">

• Node.js 14+  
• MongoDB Atlas account  
• Firebase project  
• M-PESA Sandbox credentials

</div>

<br>

### **1. Clone & Install**

```bash
git clone https://github.com/yourusername/sentismart.git
cd sentismart

# Install all dependencies
npm run install:all
```

<br>

### **2. Environment Setup**

```bash
# Backend environment
cp backend/.env.example backend/.env

# Frontend environment  
cp frontend/.env.example frontend/.env
```

<br>

### **3. Configure Services**

<div style="padding: 20px; border-left: 4px solid #FFC107; background: rgba(255, 193, 7, 0.05); border-radius: 0 12px 12px 0; margin: 16px 0;">

• **Firebase**: Add your config to both frontend and backend  
• **MongoDB**: Update connection string in backend/.env  
• **M-PESA**: Add Consumer Key, Consumer Secret, and Passkey

</div>

<br>

### **4. Launch Development**

```bash
# Start both frontend and backend concurrently
npm run dev

# Or start individually
npm run dev:backend   # Runs on port 5000
npm run dev:frontend  # Runs on port 3000
```

<br>

### **5. Access the Platform**

<div style="display: grid; gap: 8px; padding: 16px; background: rgba(40, 167, 69, 0.1); border-radius: 12px; margin: 16px 0;">

• **Frontend**: http://localhost:3000  
• **Backend API**: http://localhost:5000/api  
• **Socket.IO**: Connected automatically

</div>

<br>

---

<br>

## 🧪 Testing & Quality Assurance

<br>

### **Comprehensive Test Suite**

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

<br>

### **Quality Metrics**

<div style="display: grid; gap: 12px; padding: 20px; background: rgba(23, 162, 184, 0.1); border-radius: 16px; margin: 20px 0;">

**95%+ Test Coverage** on critical paths  
**Performance Monitoring** with Lighthouse scores  
**Security Auditing** with npm audit  
**Code Quality** with ESLint + Prettier

</div>

<br>

---

<br>

## 🌍 Social Impact & Scalability

<br>

### **Target Demographics**

<div style="padding: 20px; border-radius: 16px; background: linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(255, 193, 7, 0.1) 100%); margin: 16px 0;">

• **Everyone seeking financial empowerment**, with special focus on youth (18-35)  
• **University and Students** managing allowances and expenses  
• **Young Professionals** building emergency funds  
• **Community Groups** organizing savings and investments

</div>

<br>

### **Scalability Features**

<div style="padding: 20px; border-radius: 16px; background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(0, 212, 170, 0.1) 100%); margin: 16px 0;">

• **Multi-tenant Architecture** ready for white-label deployment  
• **Microservices-ready** backend structure  
• **CDN-optimized** frontend build  
• **Database sharding** support for millions of users

</div>

<br>

### **Future Roadmap**

<div style="display: grid; gap: 12px; padding: 20px; background: rgba(118, 75, 162, 0.1); border-radius: 16px; margin: 20px 0;">

📱 **Native Mobile Apps** (React Native)  
🗣️ **AI Voice Assistant** for financial coaching  
💱 **Multi-currency Support** for regional expansion  
📈 **Advanced Analytics** with machine learning insights  
🏦 **Financial Institution Integration** for account linking  
🎓 **Gamified Learning** modules with certificates

</div>

<br>

---

<br>

## 🏅 Why SentiSmart Wins

<br>

### **Innovation Excellence**

<div style="padding: 20px; border-left: 4px solid #28a745; background: rgba(40, 167, 69, 0.05); border-radius: 0 12px 12px 0; margin: 16px 0;">

• **First platform** to combine personal finance, community savings, and social impact  
• **Custom AI engine** eliminates dependency on expensive external APIs  
• **Real-time collaboration** transforms traditional Chama groups

</div>

<br>

### **Technical Mastery**

<div style="padding: 20px; border-left: 4px solid #007bff; background: rgba(0, 123, 255, 0.05); border-radius: 0 12px 12px 0; margin: 16px 0;">

• **Full-stack expertise** with modern technologies  
• **Scalable architecture** ready for millions of users  
• **Security-first design** with comprehensive validation

</div>

<br>




<br>

### **Market Potential**

<div style="padding: 20px; border-left: 4px solid #fd7e14; background: rgba(253, 126, 20, 0.05); border-radius: 0 12px 12px 0; margin: 16px 0;">

• **500M+ youth** in Africa need financial literacy tools  
• **Growing mobile money** adoption (M-PESA leads with 50M+ users)  
• **Community savings groups** represent $12B+ market opportunity

</div>

<br>

---

<br>

## 👨‍💻 Meet the Developer

<div align="center" style="padding: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; color: white; margin: 24px 0;">

<h3>Hassan Faruq</h3>
<em>Full-Stack Developer &  Technology Innovator</em>

<br><br>



📧 **Contact**: [faruqhassan@gmail.com.com]  
🔗 **LinkedIn**: [https://www.linkedin.com/in/hassan-faruq777/]  
🐙 **GitHub**: [https://github.com/Faruq-Feroz]

</div>

<br>

---

<br>

## 🤝 Contributing to the Revolution

<div style="text-align: center; padding: 24px; background: rgba(0, 212, 170, 0.1); border-radius: 16px; margin: 20px 0;">

**We welcome contributors who share our vision of financial empowerment!**

</div>

<br>

### How to Contribute

<div style="display: grid; gap: 12px; padding: 20px; margin: 16px 0;">

1. **Fork** the repository  
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)  
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)  
4. **Push** to the branch (`git push origin feature/AmazingFeature`)  
5. **Open** a Pull Request

</div>

<br>

### Contribution Areas

<div style="display: grid; gap: 12px; padding: 20px; background: rgba(102, 126, 234, 0.05); border-radius: 16px; margin: 16px 0;">

🐛 **Bug Fixes** and performance improvements  
✨ **New Features** and user experience enhancements  
🧪 **Testing** and quality assurance  
📚 **Documentation** and tutorials  
🌍 **Localization** for different African markets

</div>

<br>

---

<br>

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

<br>

---

<br>

## 🙏 Acknowledgements



<br>

---

<br>

## 🎯 Join the Financial Revolution

<br>

<div align="center" style="padding: 32px; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); border-radius: 20px; color: white; margin: 24px 0;">

<h3><em>"Every great journey begins with a single step. Every financial dream starts with smart planning. Every community thrives with shared goals."</em></h3>

<br>

**SentiSmart** isn't just a platform—it's a movement. A movement that transforms how Africa manages money, builds communities, and achieves dreams.

</div>

<br>

### **Ready to be part of something bigger?**

<div align="center" style="padding: 24px; margin: 20px 0;">

⭐ **Star this repository** if you believe in financial empowerment  
🍴 **Fork and contribute** to join our developer community  
📢 **Share with friends** who need financial literacy tools  
💡 **Submit ideas** for features that can change lives

</div>

<br>

---

<div align="center" style="padding: 24px;">

**🚀 [Live Demo](https://senti-smart.vercel.app/) | 📖 [Documentation](your-docs-url) | **

<br><br>

<em>Built with ❤️ in Kenya for Africa and the World</em>

</div>
