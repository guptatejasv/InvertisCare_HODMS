import { Router } from "express";
// import { verify_token } from "../helper/jwtVerify";
import { register } from "../controllers/Authentication/hod.register";
import { login } from "../controllers/Authentication/hod.login";
import { verify_token } from "../helper/jwtVerify";
import { getComplaints } from "../controllers/Authentication/hod.getComplaints";
import { reviewComplaint } from "../controllers/Authentication/hod.reviewComplaint";
import { updateStatus } from "../controllers/Authentication/hod.updateStatus";

const router = Router();
router.post("/auth/hod/register", register);
router.post("/auth/hod/login", login);
router.get("/hod/getComplaints", verify_token, getComplaints);
router.get("/hod/reviewComplaint/:id", verify_token, reviewComplaint);
router.patch("/hod/updateStatus/:id", verify_token, updateStatus);
export default router;
