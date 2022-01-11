import { Schema } from 'mongoose';

export interface UserModel {
    _id: string;
    firstName: string;
    lastName: string;
    nickName: string;
    email: string;
    password: string;
    level: number;
    avatar: string;
    sexe: string;
    weight: number;
    height: number;
    pro: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const UserSchema = new Schema<UserModel>(
    {
        firstName: { type: String },
        lastName: { type: String },
        nickName: { type: String },
        email: { type: String, index: true, unique: true },
        password: { type: String },
        level: { type: Number, default: 1 },
        avatar: { type: String },
        sexe: { type: String },
        weight: { type: Number },
        height: { type: Number },
        pro: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);
