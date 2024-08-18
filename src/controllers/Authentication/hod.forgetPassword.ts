import { Request, Response } from "express";
import crypto from "crypto";
import { transporter } from "../../helper/nodemailer";
import dotenv from "dotenv";
import { HOD } from "../../model/official.HOD";
dotenv.config();

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const hod = await HOD.findOne({
      email: req.body.email,
    });
    if (!hod) {
      return res.status(400).json({
        status: "fail",
        message: "No user found",
      });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");

    hod.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    hod.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    await hod.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/auth/resetPassword/${resetToken}`;
    const message = `Forgot your passsword? Please submit a PATCH request with a new Password to: ${resetURL}.\n If you don't forget the password please ignore this mail! `;
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: hod.email,
        subject: "InvertisCare: Forget Password Mail",
        text: message,
      });
      res.status(200).json({
        status: "success",
        message: "Token sent to email!",
      });
    } catch (err) {
      hod.passwordResetToken = undefined;
      hod.passwordResetExpires = undefined;
      await hod.save();
      return res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
