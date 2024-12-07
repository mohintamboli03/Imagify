import express from "express";

import userAuth from "../middleware/auth.js";
import { genrateImage } from "../controllers/ImagesController.js";

const router = express.Router();

router.post("/generate-image",userAuth,genrateImage)
export default router;
