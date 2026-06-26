const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server error',
    errors: err.errors || undefined,
  });
};

module.exports = errorHandler;
