// // const errorHandler = (err, req, res, next) => {
// //     res.status(err.status || 500).json({
// //         error: true,
// //         message: err.message || "Internal Server Error"
// //     });
// // };

// // module.exports = errorHandler;
// /**
//  * Centralized Error Handler Middleware
//  * Catches all errors passed via next(error) from controllers
//  */
// const errorHandler = (err, req, res, next) => {
//     // Log the error for the developer (you) to see in the terminal
//     console.error(`[ERROR] ${err.message}`);

//     // Set the status code: 
//     // Use the error's own status (if provided) or default to 500 (Internal Server Error)
//     const statusCode = err.status || 500;

//     // Send a professional JSON response to the Frontend
//     res.status(statusCode).json({
//         success: false,
//         status: statusCode,
//         message: err.message || "A server error occurred. Please try again later.",
//         // Only include the stack trace if you're in development mode
//         stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//     });
// };

// module.exports = errorHandler;

/**
 * Section D: Centralized Error Handling Middleware
 * This function handles all errors passed via next(error)
 */
const errorHandler = (err, req, res, next) => {
    // 1. Log the error for the developer (Internal)
    console.error(`[SERVER ERROR]: ${err.message}`);

    // 2. Determine the Status Code (default to 500 if not specified)
    const statusCode = err.status || 500;

    // 3. Return a standardized JSON response (External)
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: err.message || "An unexpected error occurred on the server.",
        // Stack trace is only shown in development mode for debugging
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = errorHandler;