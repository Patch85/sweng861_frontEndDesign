"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the email already exists
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // Create and save the new user
        const user = new user_model_1.default({ ...req.body, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.registerUser = registerUser;
const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        // Compare the provided password with the hashed password
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        // Authentication successful
        res.status(200).json({ message: 'Login successful' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.authenticateUser = authenticateUser;
