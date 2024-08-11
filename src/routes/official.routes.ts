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
import { DeanRegister } from "../controllers/Authentication/Deans/dean.register";
import { Deanlogin } from "../controllers/Authentication/Deans/dean.login";
import { getDeans } from "../controllers/Authentication/hod.getDeans";
import { escalatedTo } from "../controllers/Authentication/hod.escalate";
import { getProfile } from "../controllers/Authentication/hod.getProfile";
import { updateProfile } from "../controllers/Authentication/hod.updateProfile";
import { getNotifications } from "../controllers/Authentication/hod.getNotfications";
import { readNotification } from "../controllers/Authentication/hod.markReadNotification";

const router = Router();
router.post("/auth/hod/register", HodRegister);
router.post("/auth/hod/login", HodLogin);
router.get("/hod/getProfile", verify_token, getProfile);
router.patch("/hod/updateProfile", verify_token, updateProfile);
router.get("/hod/getComplaints", verify_token, getComplaints);
router.get("/hod/reviewComplaint/:id", verify_token, reviewComplaint);
router.patch("/hod/updateStatus/:id", verify_token, updateStatus);
router.post("/hod/addComment/:id", verify_token, addComment);
router.get("/hod/getComments/:id", verify_token, getComments);
router.get("/hod/updateComment/:id", verify_token, updateComment);
router.get("/hod/getDeans", verify_token, getDeans);
router.patch("/hod/escalatedTo/:id", verify_token, escalatedTo);
router.get("/hod/getNotifications", verify_token, getNotifications);
router.patch("/hod/readNotificaion/:id", verify_token, readNotification);

// Dean routes
router.post("/auth/dean/register", DeanRegister);
router.post("/auth/dean/login", Deanlogin);

export default router;
