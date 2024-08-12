import { Request, Response } from "express";
import Complaint from "../../model/official.complaint";
import Notification from "../../model/student.notificaitons";
import { transporter } from "../../helper/nodemailer";
import { Student } from "../../model/student.user";
import { HOD } from "../../model/official.HOD";
import { Dean } from "../../model/official.deans";
export const escalatedTo = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const hod = await HOD.findById(userId);
    const compId = req.params.id;
    const { escalatedTo } = req.body;
    const commentEscalate = await Complaint.findByIdAndUpdate(
      compId,
      {
        escalatedTo,
      },
      { new: true }
    );

    await Notification.create({
      studentRefId: commentEscalate?.studentRefId,
      message: `Your complaint with ${compId} id is escalated to Dean`,
      type: "Complaint Update",
    });
    const dean = await Dean.findById(escalatedTo);
    if (dean) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: dean.email,
        subject: "InvertisCare: New Complaint Added",
        text: `A new Complaint with ${compId} at InvertisCare is Assigned to you by ${hod?.name}(Head of ${hod?.department} Department). Please check your Profile`,
      });
    }
    const student = await Student.findById(commentEscalate?.studentRefId);
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
      commentEscalate,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during registration.",
    });
  }
};
