const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const adviceRoutes = require('./routes/advice');
const savingsRoutes = require('./routes/savings');
const chamaRoutes = require('./routes/chama');
const mpesaRoutes = require('./routes/mpesa');

// Initialize express app
const app = express();
const server = http.createServer(app);

// Allow these frontends
const allowedOrigins = [
  'http://localhost:5173',
  'https://senti-smart.vercel.app'
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sentismart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/advice', adviceRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/chama', chamaRoutes);
app.use('/api/mpesa', mpesaRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('SentiSmart API is running');
});

// Socket.io setup
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const Chama = require('./models/Chama');

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinChamaRoom', (chamaId) => {
    socket.join(chamaId);
    console.log(`Client joined Chama room: ${chamaId}`);
  });

  socket.on('leaveChamaRoom', (chamaId) => {
    socket.leave(chamaId);
    console.log(`Client left Chama room: ${chamaId}`);
  });

  socket.on('sendMessage', async ({ chamaId, message, user }) => {
    try {
      const chamaGroup = await Chama.findById(chamaId);
      if (chamaGroup) {
        if (chamaGroup.creator === user.uid || chamaGroup.members.includes(user.uid)) {
          const newMessage = {
            sender: user.uid,
            content: message,
            timestamp: new Date()
          };

          chamaGroup.messages.push(newMessage);
          await chamaGroup.save();

          io.to(chamaId).emit('newMessage', {
            ...newMessage,
            senderName: user.displayName,
            senderPhoto: user.photoURL
          });
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  socket.on('newContribution', ({ chamaId, contribution, user }) => {
    io.to(chamaId).emit('contributionAdded', {
      ...contribution,
      contributorName: user.displayName
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
