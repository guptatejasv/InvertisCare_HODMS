import { Router } from "express";
// import { verify_token } from "../helper/jwtVerify";
import { register } from "../controllers/Authentication/hod.register";
import { login } from "../controllers/Authentication/hod.login";
import { verify_token } from "../helper/jwtVerify";
import { getComplaints } from "../controllers/Authentication/hod.getComplaints";
import { reviewComplaint } from "../controllers/Authentication/hod.reviewComplaint";

const router = Router();
router.post("/auth/hod/register", register);
router.post("/auth/hod/login", login);
router.get("/hod/getComplaints", verify_token, getComplaints);
router.get("/hod/reviewComplaint/:id", verify_token, reviewComplaint);
export default router;
