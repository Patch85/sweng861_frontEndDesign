import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
import User from '../models/user.model';
import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const mongoUri = 'mongodb://localhost:27017/individual_practice';
mongoose
  .connect(mongoUri, {})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define routes

app.post('/api/users', async (req: Request, res: Response) => {
  console.log(`Request body: ${JSON.stringify(req.body)}`);

  const user = new User(req.body);
  await user.save();

  res.status(201).json(user);
});

// app.get('/api/users', async (req: Request, res: Response) => {
//   const users = await User.find();
//   res.json(users);
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
