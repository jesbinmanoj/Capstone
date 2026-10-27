const notFound = (req, res, next) => {
  const error = new Error(`Resource Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Log error internally for debugging without exposing internals to client
  console.error(`[API Error] ${req.method} ${req.originalUrl}:`, err.message);

  let message = err.message || 'Internal Server Error';

  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    message = 'Duplicate field value entered. A record with this information already exists.';
    return res.status(409).json({
      success: false,
      message
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json({
      success: false,
      message
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
};

module.exports = { notFound, errorHandler };
