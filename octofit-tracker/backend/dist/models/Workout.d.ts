import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IWorkout, {}, {}, {}, mongoose.Document<unknown, {}, IWorkout> & IWorkout & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=Workout.d.ts.map