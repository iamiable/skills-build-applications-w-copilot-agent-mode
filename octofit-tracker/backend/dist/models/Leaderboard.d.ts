import mongoose, { Document } from 'mongoose';
export interface ILeaderboard extends Document {
    userId?: mongoose.Types.ObjectId;
    teamId?: mongoose.Types.ObjectId;
    rank: number;
    score: number;
    period: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const _default: mongoose.Model<ILeaderboard, {}, {}, {}, mongoose.Document<unknown, {}, ILeaderboard> & ILeaderboard & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=Leaderboard.d.ts.map