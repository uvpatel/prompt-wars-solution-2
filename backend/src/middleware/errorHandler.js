export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const message = err.message || "Unexpected server error";

  res.status(status).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {})
    }
  });
}
