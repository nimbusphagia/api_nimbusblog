import { body, param } from "express-validator"
export const signupValidator = [
  body('name')
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }).withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.'),];

export const idValidator = [
  param("userId").isUUID().withMessage("INVALID_USER_ID"),
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }).withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.'),];

export const authorInfoValidator = [
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Email must be valid'),
  body('name')
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
];
