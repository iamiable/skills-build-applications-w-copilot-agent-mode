import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  profile?: {
    bio?: string;
    avatar?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profile: {
      bio: String,
      avatar: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
