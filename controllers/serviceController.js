const db = require('../config/db');

// 1. Retrieve all services
exports.getAllServices = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM services');
        res.status(200).json({ success: true, data: rows });
    } catch (error) { next(error); }
};

// 2. Retrieve a single service by ID
exports.getServiceById = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: "Service not found" });
        res.status(200).json({ success: true, data: rows[0] });
    } catch (error) { next(error); }
};

// 3. Create a new service
exports.createService = async (req, res, next) => {
    try {
        const { name, description, price, duration } = req.body;
        // Validation: Ensure required fields are present
        if (!name || !price) return res.status(400).json({ success: false, message: "Name and Price are required" });

        const sql = "INSERT INTO services (name, description, price, duration) VALUES (?, ?, ?, ?)";
        const [result] = await db.query(sql, [name, description, price, duration]);
        res.status(201).json({ success: true, id: result.insertId, message: "Service created successfully" });
    } catch (error) { next(error); }
};

// 4. Update an existing service
exports.updateService = async (req, res, next) => {
    try {
        const { name, description, price, duration, is_available } = req.body;
        const sql = "UPDATE services SET name=?, description=?, price=?, duration=?, is_available=? WHERE id=?";
        const [result] = await db.query(sql, [name, description, price, duration, is_available, req.params.id]);
        
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Service not found" });
        res.status(200).json({ success: true, message: "Service updated" });
    } catch (error) { next(error); }
};

// 5. Delete a service
exports.deleteService = async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM services WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Service not found" });
        res.status(200).json({ success: true, message: "Service deleted" });
    } catch (error) { next(error); }
};