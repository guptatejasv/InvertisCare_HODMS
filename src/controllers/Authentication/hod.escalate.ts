import { Request, Response } from "express";
import Complaint from "../../model/official.complaint";
import Notification from "../../model/student.notificaitons";
export const escalatedTo = async (req: Request, res: Response) => {
  try {
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
