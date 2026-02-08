export function errorHandler(err, req, res, next) {
  console.error(err);

  const errorMap = {
    ROLE_EXISTS: {
      status: 409,
      message: "Role already exists",
    },
    EMAIL_UNAVAILABLE: {
      status: 409,
      message: "Email unavailable",
    },
    USER_NOT_FOUND: {
      status: 404,
      message: "User not found",
    },
    NO_FIELDS_TO_UPDATE: {
      status: 400,
      message: "No fields provided to update",
    },
    INVALID_CREDENTIALS: {
      status: 401,
      message: "Invalid credentials"
    }
  };

  const error = errorMap[err.message];

  if (error) {
    return res.status(error.status).json({
      error: err.message,
      message: error.message,
    });
  }

  return res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: "Server error",
  });
}

