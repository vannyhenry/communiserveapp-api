// const express = require('express');
// const cors = require('cors');
// const serviceRoutes = require('./routes/serviceRoutes');
// const errorHandler = require('./middleware/errorHandler');

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/services', serviceRoutes);

// // Error Handling Middleware (Must be last)
// app.use(errorHandler);

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Import Middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors()); // Allows Flutter app to talk to this server
app.use(express.json()); // Allows server to read JSON bodies

// --- 2. ROUTES ---
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// Root route for testing if API is live
app.get('/', (req, res) => {
    res.send('CommuniServe REST API is live!');
});

// --- 3. ERROR HANDLING ---
// This MUST be the last middleware added to the app
app.use(errorHandler);

// --- 4. START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🛠️ Mode: ${process.env.NODE_ENV || 'development'}`);
});