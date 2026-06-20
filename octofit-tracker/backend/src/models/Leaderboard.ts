import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId?: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  rank: number;
  score: number;
  period: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const LeaderboardSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    period: { type: String, default: 'all-time' },
  },
  { timestamps: true }
);

export default mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
