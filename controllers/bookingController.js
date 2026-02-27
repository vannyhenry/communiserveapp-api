const db = require('../config/db');

// GET: Retrieve all bookings for User 1 (Section C & D)
exports.getAllBookings = async (req, res, next) => {
    try {
        const sql = `
            SELECT b.id, s.name as service_name, bs.status_name, b.booking_date, b.time_slot 
            FROM bookings b
            JOIN services s ON b.service_id = s.id
            JOIN booking_statuses bs ON b.status_id = bs.id
            WHERE b.user_id = 1
        `;
        const [rows] = await db.query(sql);
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        // Passes the error to the centralized middleware
        next(error); 
    }
};

// POST: Create a new booking linked to User 1 (Section B & C)
exports.createBooking = async (req, res, next) => {
    try {
        const { service_id, booking_date, time_slot, notes } = req.body;
        
        // Validation check (Demonstrating Section D manual error throwing)
        if (!service_id || !booking_date) {
            const err = new Error("Service ID and Date are required.");
            err.status = 400;
            throw err;
        }

        const user_id = 1;
        const status_id = 1; // Default to 'Scheduled'

        const sql = `INSERT INTO bookings (user_id, service_id, status_id, booking_date, time_slot, notes) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        
        const [result] = await db.query(sql, [user_id, service_id, status_id, booking_date, time_slot, notes]);
        
        res.status(201).json({ success: true, bookingId: result.insertId });
    } catch (error) {
        next(error);
    }
};

// PATCH: Cancel a booking (Section C)
exports.cancelBooking = async (req, res, next) => {
    try {
        const status_id = 3; // 'Cancelled'
        const [result] = await db.query("UPDATE bookings SET status_id = ? WHERE id = ?", [status_id, req.params.id]);
        
        if (result.affectedRows === 0) {
            const err = new Error("Booking not found.");
            err.status = 404;
            throw err;
        }

        res.status(200).json({ success: true, message: "Booking cancelled successfully" });
    } catch (error) {
        next(error);
    }
};