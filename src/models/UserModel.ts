import { Schema } from 'mongoose';

export interface UserModel {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export const UserSchema = new Schema<UserModel>({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, index: true, unique: true },
    password: { type: String },
});
