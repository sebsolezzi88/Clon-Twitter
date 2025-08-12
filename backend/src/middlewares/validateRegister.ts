import { body } from 'express-validator';
import User from '../models/User';

export const validateUserRegister = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 6 }).withMessage('Username must have at least 6 characters')
        .custom(async (value) => {
            const existingUser = await User.findOne({ username: value });
            if (existingUser) {
                throw new Error('Username already in use');
            }
            return true;
        }),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid')
        .custom(async (value) => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser) {
                throw new Error('Email already in use');
            }
            return true;
        }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
];