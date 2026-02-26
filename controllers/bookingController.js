// const db = require('../config/db');

// // CREATE: New Booking
// exports.createBooking = async (req, res, next) => {
//     try {
//         // user_id is assumed to be 1 as per requirements
//         const { service_id, booking_date, time_slot, notes } = req.body;
//         const user_id = 1; 
//         const status_id = 1; // 1 = 'Scheduled' based on our seed data

//         const sql = `
//             INSERT INTO bookings (user_id, service_id, status_id, booking_date, time_slot, notes) 
//             VALUES (?, ?, ?, ?, ?, ?)
//         `;

//         const [result] = await db.query(sql, [user_id, service_id, status_id, booking_date, time_slot, notes]);

//         res.status(201).json({
//             success: true,
//             message: "Booking created successfully",
//             bookingId: result.insertId
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// // READ: Get all bookings with Joins
// exports.getAllBookings = async (req, res, next) => {
//     try {
//         const sql = `
//             SELECT 
//                 b.id, 
//                 s.name AS service_name, 
//                 bs.status_name AS status, 
//                 b.booking_date, 
//                 b.time_slot, 
//                 b.notes,
//                 b.created_at
//             FROM bookings b
//             JOIN services s ON b.service_id = s.id
//             JOIN booking_statuses bs ON b.status_id = bs.id
//             ORDER BY b.booking_date DESC
//         `;
//         const [rows] = await db.query(sql);
//         res.status(200).json(rows);
//     } catch (error) {
//         next(error);
//     }
// };

// // UPDATE: Change Status (Admin or User Cancel)
// exports.updateBookingStatus = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { status_id } = req.body; // Pass 2 for Completed, 3 for Cancelled

//         const sql = "UPDATE bookings SET status_id = ? WHERE id = ?";
//         await db.query(sql, [status_id, id]);

//         res.status(200).json({ success: true, message: "Booking status updated" });
//     } catch (error) {
//         next(error);
//     }
// };

const db = require('../config/db');

// 1. Retrieve all bookings (with Joins for Status Name)
exports.getAllBookings = async (req, res, next) => {
    try {
        const sql = `
            SELECT b.*, s.name as service_name, bs.status_name 
            FROM bookings b
            JOIN services s ON b.service_id = s.id
            JOIN booking_statuses bs ON b.status_id = bs.id
        `;
        const [rows] = await db.query(sql);
        res.status(200).json({ success: true, data: rows });
    } catch (error) { next(error); }
};

// 2. Retrieve a single booking
exports.getBookingById = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: "Booking not found" });
        res.status(200).json({ success: true, data: rows[0] });
    } catch (error) { next(error); }
};

// 3. Create a booking (Linked to User ID = 1)
exports.createBooking = async (req, res, next) => {
    try {
        const { service_id, booking_date, time_slot, notes } = req.body;
        const user_id = 1; // Predefined as per instructions
        const status_id = 1; // Default to 'Scheduled'

        const sql = "INSERT INTO bookings (user_id, service_id, status_id, booking_date, time_slot, notes) VALUES (?, ?, ?, ?, ?, ?)";
        const [result] = await db.query(sql, [user_id, service_id, status_id, booking_date, time_slot, notes]);
        res.status(201).json({ success: true, id: result.insertId });
    } catch (error) { next(error); }
};

// 4. Update booking status
exports.updateStatus = async (req, res, next) => {
    try {
        const { status_id } = req.body; // e.g., 2 for 'Completed'
        await db.query("UPDATE bookings SET status_id = ? WHERE id = ?", [status_id, req.params.id]);
        res.status(200).json({ success: true, message: "Status updated" });
    } catch (error) { next(error); }
};

// 5. Cancel a booking
exports.cancelBooking = async (req, res, next) => {
    try {
        const status_id = 3; // ID for 'Cancelled'
        await db.query("UPDATE bookings SET status_id = ? WHERE id = ?", [status_id, req.params.id]);
        res.status(200).json({ success: true, message: "Booking cancelled" });
    } catch (error) { next(error); }
};