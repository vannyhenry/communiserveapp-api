// const db = require('../config/db');

// exports.getAllServices = async (req, res, next) => {
//     try {
//         const [rows] = await db.query('SELECT * FROM services');
//         res.status(200).json(rows);
//     } catch (error) {
//         next(error); // Sends error to the centralized handler
//     }
// };

const db = require('../config/db');

// GET all services
exports.getServices = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM services WHERE is_available = true');
        res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
};

// POST: Add new service (Admin)
exports.addService = async (req, res, next) => {
    try {
        const { name, description, price, duration } = req.body;
        const sql = "INSERT INTO services (name, description, price, duration) VALUES (?, ?, ?, ?)";
        await db.query(sql, [name, description, price, duration]);
        res.status(201).json({ success: true, message: "Service added" });
    } catch (error) {
        next(error);
    }
};

// PUT: Edit service (Admin)
exports.updateService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, duration, is_available } = req.body;
        const sql = `
            UPDATE services 
            SET name = ?, description = ?, price = ?, duration = ?, is_available = ? 
            WHERE id = ?
        `;
        await db.query(sql, [name, description, price, duration, is_available, id]);
        res.status(200).json({ success: true, message: "Service updated" });
    } catch (error) {
        next(error);
    }
};

// DELETE: Remove service (Admin)
exports.deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM services WHERE id = ?', [id]);
        res.status(200).json({ success: true, message: "Service removed" });
    } catch (error) {
        next(error);
    }
};