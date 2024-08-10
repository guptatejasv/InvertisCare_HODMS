import { Request, Response } from "express";
import Complaint from "../../model/officail.complaint";
import { HOD } from "../../model/official.HOD";

export const getComplaints = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const hod = await HOD.findById(userId);
    if (hod) {
      if (hod.role == "HOD") {
        const complaint = await Complaint.find();
        if (!complaint) {
          return res.status(400).json({
            status: "fail",
            message: "No Complaint does exist.",
          });
        }
        res.status(200).json({
          status: "success",
          results: complaint.length,
          complaint,
        });
      }
    } else {
      res.send("Something went wrong!");
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
