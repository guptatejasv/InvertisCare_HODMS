import { Router } from "express";
import { HodRegister } from "../controllers/Authentication/hod.register";
import { HodLogin } from "../controllers/Authentication/hod.login";
import { verify_token } from "../helper/jwtVerify";
import { getComplaints } from "../controllers/Authentication/hod.getComplaints";
import { reviewComplaint } from "../controllers/Authentication/hod.reviewComplaint";
import { updateStatus } from "../controllers/Authentication/hod.updateStatus";
import { addComment } from "../controllers/Authentication/hod.comment";
import { getComments } from "../controllers/Authentication/hod.getComments";
import { updateComment } from "../controllers/Authentication/hod.updateComments";
import { getDeans } from "../controllers/Authentication/hod.getDeans";
import { escalatedToDean } from "../controllers/Authentication/hod.escalate";
import { getProfile } from "../controllers/Authentication/hod.getProfile";
import { updateProfile } from "../controllers/Authentication/hod.updateProfile";
import { getNotifications } from "../controllers/Authentication/hod.getNotfications";
import { readNotification } from "../controllers/Authentication/hod.markReadNotification";
import { deleteComment } from "../controllers/Authentication/hod.deleteComment";
import { forgetPassword } from "../controllers/Authentication/hod.forgetPassword";
import { resetPassword } from "../controllers/Authentication/hod.resetPassword";
import { search } from "../controllers/Authentication/hod.search";
import { resizeUserPhoto, uploadUserPhoto } from "../helper/multer";

const router = Router();
router.post(
  "/auth/hod/register",
  uploadUserPhoto,
  resizeUserPhoto,
  HodRegister
);
router.post("/auth/hod/login", HodLogin);
router.post("/auth/hod/forgetPassword", forgetPassword);
router.patch("/auth/hod/resetPassword/:token", resetPassword);
router.get(
  "/hod/getProfile",
  verify_token,
  uploadUserPhoto,
  resizeUserPhoto,
  getProfile
);
router.patch("/hod/updateProfile", verify_token, updateProfile);
router.get("/hod/getComplaints", verify_token, getComplaints);
router.get("/hod/reviewComplaint/:id", verify_token, reviewComplaint);
router.patch("/hod/updateStatus/:id", verify_token, updateStatus);
router.post("/hod/addComment/:id", verify_token, addComment);
router.get("/hod/getComments/:id", verify_token, getComments);
router.patch("/hod/updateComment/:id", verify_token, updateComment);
router.delete("/hod/deleteComment/:id", verify_token, deleteComment);
router.get("/hod/getDeans", verify_token, getDeans);
router.patch("/hod/escalatedTo/:id", verify_token, escalatedToDean);
router.get("/hod/getNotifications", verify_token, getNotifications);
router.patch("/hod/readNotificaion/:id", verify_token, readNotification);
router.post("/hod/search", verify_token, search);

export default router;
