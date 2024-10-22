import { Schema, Document, model } from "mongoose";

export interface IDean extends Document {
  DeanId: string;
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
}

const AuthSchema: Schema = new Schema(
  {
    DeanId: {
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
      default: "Dean",
    },
    phone: {
      type: String,
    },
    department: {
      type: String,
    },
    dob: {
      type: Date,
    },
    photo: {
      type: String,
    },
    name: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
    },
    isBlocked: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Dean = model<IDean>("Dean", AuthSchema);
