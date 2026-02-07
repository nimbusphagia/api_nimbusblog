export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.message === 'ROLE_EXISTS') {
    return res.status(409).json({
      message: 'Role already exists',
    });
  }

  res.status(500).json({
    message: 'Internal server error',
  });
}

