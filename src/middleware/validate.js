import { validationResult } from 'express-validator';

export function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formatted = {};

    errors.array().forEach(err => {
      if (!formatted[err.path]) {
        formatted[err.path] = [];
      }
      formatted[err.path].push(err.msg);
    });

    return res.status(400).json({
      message: 'Validation error',
      errors: formatted
    });
  }

  next();
}

