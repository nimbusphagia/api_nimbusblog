export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.message === 'ROLE_EXISTS') {
    return res.status(409).json({
      message: 'Role already exists',
    });
  }

  res.status(400).json({
    message: err.message,
  });
}

