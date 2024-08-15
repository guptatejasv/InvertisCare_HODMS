import { Request, Response } from "express";
import Complaint from "../../model/official.complaint";
import Notification from "../../model/student.notificaitons";
import mongoose from "mongoose";
import { transporter } from "../../helper/nodemailer";
import { Student } from "../../model/student.user";
import { HOD } from "../../model/official.HOD";
import { Dean } from "../../model/official.deans";
import DeanNotification from "../../model/dean.notifications";
export const escalatedToDean = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const hod = await HOD.findById(userId);
    const compId = req.params.id;
    const { escalatedToDean } = req.body;
    if (!mongoose.Types.ObjectId.isValid(escalatedToDean)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Dean ID provided.",
      });
    }
    const complaint = await Complaint.findById(compId);
    if (complaint) {
      complaint.escalatedToDean = escalatedToDean;
      await complaint.save();
    }
    console.log(complaint);

    await Notification.create({
      studentRefId: complaint?.studentRefId,
      message: `Your complaint with ${compId} id is escalated to Dean`,
      type: "Complaint Update",
    });

    await DeanNotification.create({
      DeanId: escalatedToDean,
      message: `A New Complaint with ${compId} is assigned to you.`,
      type: "Complaint Update",
    });

    const dean = await Dean.findById(escalatedToDean);
    if (dean) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: dean.email,
        subject: "InvertisCare: New Complaint Added",
        text: `A new Complaint with ${compId} at InvertisCare is Assigned to you by ${hod?.name}(Head of ${hod?.department} Department). Please check your Profile`,
      });
    }
    const student = await Student.findById(complaint?.studentRefId);
    if (student) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: student.email,
        subject: "InvertisCare: Complaint Status Update",
        text: `Your Complaint with ${compId} at InvertisCare is Escalated to Dean ${dean?.name} by ${hod?.name}(Head of ${hod?.department} Department) and Escalated to Dean".\nPlease keep checking your mail for future updates.`,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Complaint Escalated to Dean successfully.",
      complaint,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during registration.",
    });
  }
};
