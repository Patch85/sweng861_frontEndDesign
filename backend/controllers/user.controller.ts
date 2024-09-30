import { Request, Response } from 'express';
import User from '../models/user.model';

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { email } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Create and save the new user
    const user = new User(req.body);
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
