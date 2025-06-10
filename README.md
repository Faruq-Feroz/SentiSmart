# SentiSmart Financial Advisor

A smart financial advisor platform that helps youth and individuals manage their finances better through budget tracking, financial insights, and community savings groups.

## Features

### 1. Financial Dashboard
- Real-time expense tracking
- Salary input and expense categorization
- Quick expense tags for common categories
- Visual financial summaries and charts
- Downloadable PDF financial reports

### 2. Smart Financial Insights
- Rule-based financial recommendations
- Spending pattern analysis
- Savings goal tracking
- Monthly budget comparisons
- Financial performance insights

### 3. Community Features
- Chama (Savings Group) Integration
  - Real-time contribution tracking
  - Group savings goals
  - Chat-based financial suggestions
  - M-PESA sandbox integration

### 4. Educational Resources
- Daily financial tips
- Budget templates for different lifestyles
- Financial advice section
- Investment basics for beginners
- Loan management guidance

### 5. M-PESA Integration
- Simulated payment system using M-PESA Sandbox
- Rent payment simulation
- Chama contribution tracking
- Donation system simulation
- Utility bill payment simulation

### 6. User Interface
- Modern, responsive landing page
- Interactive dashboard with financial visualizations
- Real-time notifications and reminders
- Progress tracking widgets
- Goal achievement animations

## Tech Stack

### Frontend
- React.js with Vite
- Material-UI for modern UI components
- Framer Motion for smooth animations
- React Router for navigation
- Context API for state management
- Socket.IO for real-time updates

### Backend
- Node.js with Express.js
- MongoDB for data persistence
- Firebase Authentication
- Daraja API (M-PESA Sandbox)
- Socket.IO for real-time updates
- Rule Engine for financial insights

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database (for production)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
cd sentismart
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env` in both frontend and backend directories
- Update the environment variables with your configurations

4. Start the development servers:
```bash
# Start frontend (in frontend directory)
npm run dev

# Start backend (in backend directory)
npm run dev
```

## Project Structure

```
sentismart/
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── context/            # React Context providers
│   │   ├── styles/             # Global styles
│   │   └── utils/              # Utility functions
│   └── public/                 # Static assets
└── backend/
    ├── src/
    │   ├── controllers/        # API controllers
    │   ├── models/             # Database models
    │   ├── routes/             # API routes
    │   └── services/           # Backend services
    └── config/                 # Configuration files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or inquiries, please contact:
- Hassan Faruq
- [Your Email Address]
- [Your Website/LinkedIn]
