import { Request, Response } from "express";
import { HOD } from "../../model/official.HOD";
import crypto from "crypto";
import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { transporter } from "../../helper/nodemailer";
dotenv.config();

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const hashedtoken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const hod = await HOD.findOne({
      passwordResetToken: hashedtoken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!hod) {
      return res.status(400).json({
        status: "fail",
        message: "Token is invalid or expired",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    hod.password = hashedPassword;
    hod.passwordResetToken = undefined;
    hod.passwordResetExpires = undefined;
    await hod.save({ validateBeforeSave: false });
    const secret = process.env.JWT_SECRET as string;
    const token = sign({ id: hod._id }, secret, {
      expiresIn: "90d",
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: hod.email,
      subject: "InvertisCare: Password Changed Successfully!",
      text: "Your Password at InvertisCare Portal has been changed successfully!",
    });
    res.status(200).json({
      status: "success",
      message: "Password changed successfully!",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
