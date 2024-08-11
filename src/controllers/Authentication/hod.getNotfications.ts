import { Request, Response } from "express";
import { HOD } from "../../model/official.HOD";
import HODNotification from "../../model/hod.notifications";
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const checkUser = await HOD.findById(userId);
    if (checkUser) {
      if (checkUser.isDeleted == true || checkUser.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message:
            "You can not update get notifications, Your account is deleted or block!",
        });
      }
    }
    const notifications = await HODNotification.find({ HODId: userId });
    res.status(200).json({
      status: "success",
      data: notifications,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
