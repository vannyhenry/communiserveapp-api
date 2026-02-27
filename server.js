const express = require('express');
const cors = require('cors');
require('dotenv').config();

const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// --- 1. GLOBAL MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- 2. API ROUTES ---
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// --- 3. 404 HANDLER (For undefined routes) ---
app.use((req, res, next) => {
    const error = new Error('Resource Not Found');
    error.status = 404;
    next(error);
});

// --- 4. SECTION D: CENTRALIZED ERROR HANDLER ---
// This MUST be the last middleware in the stack
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server active on http://localhost:${PORT}`);
});