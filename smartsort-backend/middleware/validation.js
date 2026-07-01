const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const fields = {};
    result.error.errors.forEach((err) => {
      const fieldPath = err.path.join('.');
      fields[fieldPath] = err.message;
    });

    return res.status(400).json({
      error: {
        code: 'VALIDATION_FAILED',
        message: 'Request validation failed',
        fields,
      },
      status: 400,
    });
  }
  
  req.body = result.data;
  next();
};

module.exports = { validate };
