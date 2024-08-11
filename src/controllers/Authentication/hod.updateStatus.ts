import { Request, Response } from "express";
import Complaint from "../../model/official.complaint";
import { transporter } from "../../helper/nodemailer";
import { Student } from "../../model/student.user";
import { HOD } from "../../model/official.HOD";
import Notification from "../../model/student.notificaitons";
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const userID = req.user.id;
    const compId = req.params.id;
    const hod = await HOD.findById(userID);
    const updateStatus = await Complaint.findByIdAndUpdate(
      compId,
      {
        status,
      },
      {
        new: true,
      }
    );
    const student = await Student.findById(updateStatus?.studentRefId);
    if (student) {
      if (status == "In progress") {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: student.email,
          subject: "InvertisCare: Complaint Status Update",
          text: `Your Complaint with ${compId} at InvertisCare is updated by ${hod?.name}(Head of Department) and changed status to "${status}".\nPlease keep checking your mail for future updates.`,
        });
      } else if (status == "Resolved") {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: student.email,
          subject: "InvertisCare: Complaint Status Update",
          text: `Your Complaint with ${compId} at InvertisCare is updated by ${hod?.name}(Head of Department) and changed status to "${status}".\nPlease keep checking your mail for future updates.`,
        });
      } else if (status == "Pending") {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: student.email,
          subject: "InvertisCare: Complaint Status Update",
          text: `Your Complaint with ${compId} at InvertisCare is updated by ${hod?.name}(Head of Department) and changed status to "${status}".\nPlease keep checking your mail for future updates.`,
        });
      } else if (status == "Escalated To Dean") {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: student.email,
          subject: "InvertisCare: Complaint Status Update",
          text: `Your Complaint with ${compId} at InvertisCare is updated by ${hod?.name}(Head of Department) and changed status to "${status}".\nPlease keep checking your mail for future updates.`,
        });
      } else if (status == "Closed") {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: student.email,
          subject: "InvertisCare: Complaint Status Update",
          text: `Your Complaint with ${compId} at InvertisCare is updated by ${hod?.name}(Head of Department) and changed status to "${status}".\nPlease keep checking your mail for future updates.`,
        });
      }
    }
    await Notification.create({
      studentRefId: updateStatus?.studentRefId,
      message: `Your Complaint with ${compId} at InvertisCare is updated by ${hod?.name}(Head of Department) and changed status to "${status}"`,
      type: "Complaint Update",
    });
    res.status(200).json({
      status: "success",
      updateStatus,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
