// const db = require('../config/db');

// // Create a new booking
// exports.createBooking = async (req, res, next) => {
//     try {
//         const { service_id, resident_name, booking_date, time_slot, notes } = req.body;

//         const sql = `
//             INSERT INTO bookings (service_id, resident_name, booking_date, time_slot, notes, status) 
//             VALUES (?, ?, ?, ?, ?, 'Scheduled')
//         `;

//         const [result] = await db.query(sql, [service_id, resident_name, booking_date, time_slot, notes]);

//         res.status(201).json({
//             success: true,
//             message: "Booking created successfully",
//             bookingId: result.insertId
//         });
//     } catch (error) {
//         next(error); // Sends error to the middleware/errorHandler.js
//     }
// };

// // Update booking status (e.g., Mark as Completed or Cancelled)
// exports.updateBookingStatus = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body; // Expected: 'Completed' or 'Cancelled'

//         const sql = "UPDATE bookings SET status = ? WHERE id = ?";
//         await db.query(sql, [status, id]);

//         res.status(200).json({
//             success: true,
//             message: `Booking marked as ${status}`
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// // Get all bookings (For the My Bookings screen)
// exports.getAllBookings = async (req, res, next) => {
//     try {
//         const [rows] = await db.query('SELECT * FROM bookings ORDER BY booking_date DESC');
//         res.status(200).json(rows);
//     } catch (error) {
//         next(error);
//     }
// };

const db = require('../config/db');

// CREATE: New Booking
exports.createBooking = async (req, res, next) => {
    try {
        // user_id is assumed to be 1 as per requirements
        const { service_id, booking_date, time_slot, notes } = req.body;
        const user_id = 1; 
        const status_id = 1; // 1 = 'Scheduled' based on our seed data

        const sql = `
            INSERT INTO bookings (user_id, service_id, status_id, booking_date, time_slot, notes) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [user_id, service_id, status_id, booking_date, time_slot, notes]);

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            bookingId: result.insertId
        });
    } catch (error) {
        next(error);
    }
};

// READ: Get all bookings with Joins
exports.getAllBookings = async (req, res, next) => {
    try {
        const sql = `
            SELECT 
                b.id, 
                s.name AS service_name, 
                bs.status_name AS status, 
                b.booking_date, 
                b.time_slot, 
                b.notes,
                b.created_at
            FROM bookings b
            JOIN services s ON b.service_id = s.id
            JOIN booking_statuses bs ON b.status_id = bs.id
            ORDER BY b.booking_date DESC
        `;
        const [rows] = await db.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
};

// UPDATE: Change Status (Admin or User Cancel)
exports.updateBookingStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status_id } = req.body; // Pass 2 for Completed, 3 for Cancelled

        const sql = "UPDATE bookings SET status_id = ? WHERE id = ?";
        await db.query(sql, [status_id, id]);

        res.status(200).json({ success: true, message: "Booking status updated" });
    } catch (error) {
        next(error);
    }
};