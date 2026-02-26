// const errorHandler = (err, req, res, next) => {
//     res.status(err.status || 500).json({
//         error: true,
//         message: err.message || "Internal Server Error"
//     });
// };

// module.exports = errorHandler;
/**
 * Centralized Error Handler Middleware
 * Catches all errors passed via next(error) from controllers
 */
const errorHandler = (err, req, res, next) => {
    // Log the error for the developer (you) to see in the terminal
    console.error(`[ERROR] ${err.message}`);

    // Set the status code: 
    // Use the error's own status (if provided) or default to 500 (Internal Server Error)
    const statusCode = err.status || 500;

    // Send a professional JSON response to the Frontend
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: err.message || "A server error occurred. Please try again later.",
        // Only include the stack trace if you're in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;