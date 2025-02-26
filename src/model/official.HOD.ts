import { Schema, Document, model } from "mongoose";

export interface IHOD extends Document {
  HODId: string;
  email: string;
  password: string;
  phone?: string;
  department?: string;
  name?: string;
  dob?: Date;
  role: string;
  photo?: string;
  isDeleted?: boolean;
  isBlocked?: boolean;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const AuthSchema: Schema = new Schema(
  {
    HODId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: "HOD",
    },
    phone: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
    },
    isBlocked: {
      type: Boolean,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const HOD = model<IHOD>("HOD", AuthSchema);
