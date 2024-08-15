import { Request, Response } from "express";
// import { HOD } from "../../model/official.HOD";
import HODNotification from "../../model/hod.notifications";
export const readNotification = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user.id;

    const notificationCheck = await HODNotification.findById(notificationId);
    if (notificationCheck) {
      if (notificationCheck.HODId.toString() !== userId) {
        return res.status(400).json({
          status: "fail",
          message: "You are not authorized to mark this notification as read..",
        });
      }
    }
    const notification = await HODNotification.findOneAndUpdate(
      { _id: notificationId },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        status: "fail",
        message: "Notification not found.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Notification marked as read.",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
