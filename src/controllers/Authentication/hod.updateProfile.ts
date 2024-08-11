import { Request, Response } from "express";
import { HOD } from "../../model/official.HOD";
// import Notification from "../../model/student.notificaitons";
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { phone, department, dob, profilePhoto } = req.body;
    const checkUser = await HOD.findById(userId);
    if (checkUser) {
      if (checkUser.isDeleted == true || checkUser.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message:
            "You can not update your profile, Your account is deleted or block!",
        });
      }
    }
    const user = await HOD.findByIdAndUpdate(
      userId,
      {
        phone,
        department,
        dob,
        photo: profilePhoto,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Your profile updated successfully..",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during updating profile.",
    });
  }
};
