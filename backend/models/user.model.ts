import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  title?: string;
  telephone?: string;
  aboutMe?: string;
  city: string;
  state: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  title: { type: String },
  telephone: { type: String },
  aboutMe: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
