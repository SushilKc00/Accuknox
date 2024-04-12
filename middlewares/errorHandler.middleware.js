const errorHandler = (error, req, res, next) => {
  error.message = error.message || "Internal server error";
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode).json({ error: error.message, success: false });
};

export default errorHandler;
