import { Request, Response } from "express";
import Complaint from "../../model/official.complaint";
import { transporter } from "../../helper/nodemailer";
import { HOD } from "../../model/official.HOD";
import Comment from "../../model/complaint.comment";
import { Student } from "../../model/student.user";
import Notification from "../../model/student.notificaitons";
import DeanNotification from "../../model/dean.notifications";

export const addComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const compId = req.params.id;
    const { comment } = req.body;

    const hod = await HOD.findById(userId);
    const complaint = await Complaint.findById(compId);

    if (complaint) {
      if (complaint.assignedTo.toString() !== userId) {
        return res.status(400).json({
          status: "fail",
          message: "You are not authrized to comment on this Complaint",
        });
      }
      const student = await Student.findById(complaint.studentRefId);
      if (student) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: student.email,
          subject: "InvertisCare: Comment Added to Complaint",
          text: `Your Complaint with ${compId} at InvertisCare is added with a comment by ${hod?.name}(Head of Department)".\nPlease login to portal to check..`,
        });
      }
      await Notification.create({
        studentRefId: student?._id,
        message: `A new Comment added to your complaint (${compId}).`,
        type: "Complaint Update",
      });
      if (complaint.escalatedToDean) {
        await DeanNotification.create({
          DeanId: complaint.escalatedToDean,
          message: `A new Comment added to the complaint with id ${compId}.`,
          type: "Complaint Update",
        });
      }
      const comments = await Comment.create({
        HODId: userId,
        studentRefId: student?._id,
        complaintId: compId,
        commentByHOD: comment,
      });
      res.status(200).json({
        status: "success",
        comments,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
