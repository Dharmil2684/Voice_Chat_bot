require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// 1. Connect to Database
connectDB();

// 2. Middleware (CRITICAL ORDER)
app.use(cors({ origin: true, credentials: true })); 

// --- THIS IS THE FIX ---
// This allows the server to read the JSON text we are sending from the frontend
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
// -----------------------

// 3. Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bot', require('./routes/botRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));