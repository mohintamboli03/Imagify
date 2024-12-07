import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transaction.model.js";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const checkUser = await userModel.findOne({ email });

    if (checkUser) {
      return res.json({ success: false, message: "user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(`error in regiter controlier. ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        sucess: false,
        message: "Something is missing",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(`error in login controller. ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(`error in userCredits controller. ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const userData = await userModel.findById(userId);

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        return res.json({ success: false, message: "Plan Not Found" });
    }

    date = Date.now();

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionData);

    const Options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(Options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }

      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const transactionData = await transactionModel.findById(
        orderInfo.receipt
      );

      if (transactionData.payment) {
        return res.json({ success: false, message: "payment failed" });
      }

      const userData = await userModel.findById(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;

      await userModel.findByIdAndUpdate(userData._id, { creditBalance });

      await transactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      return res.json({ success: true, message: "credits added" });
    } else {
      return res.json({ success: false, message: "payment failed" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
