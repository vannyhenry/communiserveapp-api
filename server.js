// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Import Routes
// const serviceRoutes = require('./routes/serviceRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');

// // Import Middleware
// const errorHandler = require('./middleware/errorHandler');

// const app = express();

// // --- 1. MIDDLEWARE ---
// app.use(cors()); // Allows Flutter app to talk to this server
// app.use(express.json()); // Allows server to read JSON bodies

// // --- 2. ROUTES ---
// app.use('/api/services', serviceRoutes);
// app.use('/api/bookings', bookingRoutes);

// // Root route for testing if API is live
// app.get('/', (req, res) => {
//     res.send('CommuniServe REST API is live!');
// });

// // --- 3. ERROR HANDLING ---
// // This MUST be the last middleware added to the app
// app.use(errorHandler);

// // --- 4. START SERVER ---
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//     console.log(`🛠️ Mode: ${process.env.NODE_ENV || 'development'}`);
// });

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Import Routes
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// 2. Import Centralized Error Middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// --- 3. MIDDLEWARE CONFIGURATION ---

// Enable CORS so your Flutter app (Emulator/Device) can connect
app.use(cors()); 

// Parse incoming JSON requests
app.use(express.json()); 

// Logger Middleware (Optional but helpful for testing)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
});

// --- 4. REST API ROUTES ---

// Service Management (Section C)
app.use('/api/services', serviceRoutes);

// Booking Management (Section C)
app.use('/api/bookings', bookingRoutes);

// Root Health Check
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "CommuniServe API is running smoothly.",
        environment: process.env.NODE_ENV || 'development'
    });
});

// --- 5. ERROR HANDLING ---

// Important: The Error Handler must be the LAST middleware
app.use(errorHandler);

// --- 6. SERVER INITIALIZATION ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('-------------------------------------------');
    console.log(`🚀 SERVER IS LIVE`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`📂 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('-------------------------------------------');
});
