import { Request, Response } from "express";
import Complaint from "../../model/officail.complaint";
import { transporter } from "../../helper/nodemailer";
import { Student } from "../../model/student.user";
import { HOD } from "../../model/official.HOD";

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { action } = req.query;
    const userID = req.user.id;
    const compId = req.params.id;
    const hod = await HOD.findById(userID);
    const updateStatus = await Complaint.findByIdAndUpdate(
      compId,
      {
        status: action,
      },
      {
        new: true,
      }
    );
    const student = await Student.findById(updateStatus?.studentRefId);
    if (student) {
      if (action == "In Progress") {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: student.email,
          subject: "InvertisCare: Complaint Status Update",
          text: `Your Complaint with ${compId} at InvertisCare is updated by ${hod?.name}(Head of Department) and changed status to "${action}".\nPlease keep checking your mail for future updates.`,
        });
      }
    }
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
