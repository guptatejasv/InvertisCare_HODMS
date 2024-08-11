import { Request, Response } from "express";
import Complaint from "../../model/official.complaint";
import { transporter } from "../../helper/nodemailer";
import { Student } from "../../model/student.user";
import { HOD } from "../../model/official.HOD";

export const reviewComplaint = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const compId = req.params.id;
    const complaint = await Complaint.findById(compId);
    const hod = await HOD.findById(userId);
    if (!complaint) {
      return res.status(400).json({
        status: "fail",
        message: "Complaint with this id does not exist..",
      });
    }
    if (complaint) {
      const student = await Student.findById(complaint.studentRefId);
      if (student) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: student.email,
          subject: "InvertisCare: Complaint Submission Confirmation",
          text: `Your Complaint with ${compId} at InvertisCare is reviewed Carefully by ${hod?.name}(Head of Department).\nPlease keep checking your mail for future updates.`,
        });
      }
    }

    res.status(200).json({
      status: "success",
      complaint,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
