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
    BLOCK_NOT_FOUND: {
      status: 404,
      message: "Block not found",
    },
    ENTRY_NOT_FOUND: {
      status: 404,
      message: "Entry not found",
    },
    COMMENT_NOT_FOUND: {
      status: 404,
      message: "Comment not found",
    },
    LIKE_NOT_FOUND: {
      status: 404,
      message: "Like not found",
    },
    NO_FIELDS_TO_UPDATE: {
      status: 400,
      message: "No fields provided to update",
    },
    INVALID_CREDENTIALS: {
      status: 401,
      message: "Invalid credentials",
    },
    INVALID_BLOCK_TYPE: {
      status: 400,
      message: "Blocks can only be 'TEXT', 'IMAGE', 'HEADING' ",
    },
    INVALID_BLOCK_ARRAY: {
      status: 400,
      message: "Entry blocks must be wrapped in an array",
    },
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

