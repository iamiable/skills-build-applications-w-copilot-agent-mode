import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  exercises?: Array<{
    name: string;
    reps?: number;
    sets?: number;
  }>;
  duration?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const WorkoutSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    exercises: [
      {
        name: String,
        reps: Number,
        sets: Number,
      },
    ],
    duration: Number,
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
