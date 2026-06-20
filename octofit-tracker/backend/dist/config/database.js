"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
exports.getDatabaseUri = getDatabaseUri;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function connectDatabase() {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}
function getDatabaseUri() {
    return MONGODB_URI;
}
//# sourceMappingURL=database.js.map