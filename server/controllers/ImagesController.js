
import axios from "axios";
import userModel from "../models/user.model.js";
import FormData from "form-data";
import { json } from "express";
export const genrateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    if (!userId || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const user = await userModel.findById( userId );

    if (!user) {
      return res.status(400).json({ success: false, message: "user not found" });
    }

    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({
        sucess: false,
        message: "No credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    const formdata = new FormData();
    formdata.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formdata,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    const Base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImg = `data:img/png;base64,${Base64Image}`;

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Image generated",
      creditBalance: user.creditBalance - 1,
      resultImg,
    });
  } catch (error) {
   console.log(`error in generate image controller ${error.message}`);
   return res.status(500),json({message:'Internal server error'})
   
    
  }
};