import express from "express";
import { LoginUser, paymentRazorpay, RegisterUser, userCredits, verifyRazorpay } from "../controllers/user.controller.js";
import userAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/credits",userAuth, userCredits);
router.post("/pay-razor",userAuth, paymentRazorpay);
router.post("/verify-razor",userAuth, verifyRazorpay);

export default router;
