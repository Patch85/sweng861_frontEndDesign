import mongoose from 'mongoose';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { registerUser, authenticateUser } from '../controllers/user.controller';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:4200', // allow the server to accept requests from the Angular app
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const mongoUri = 'mongodb://localhost:27017/individual_practice';
mongoose
  .connect(mongoUri, {})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define routes

app.post('/api/users', registerUser);
app.post('/api/login', authenticateUser);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
