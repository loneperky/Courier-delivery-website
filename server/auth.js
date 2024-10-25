import express, { Router } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import pool from "./db.js";
import cookie from "cookie-parser";
import nodemailer from "nodemailer";
dotenv.config();

const app = express();

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const checkUser = await pool.query(
      "SELECT * FROM users_information WHERE email = $1",
      [email]
    );
    if (checkUser) {
      res.status(400).json({ message: "User already exist" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users_information (fullname,email,password) VALUES($1,$2,$3) RETURNING *",
      [fullName, email, hashPassword]
    );
    const token = jwt.sign(
      { email: newUser.email },
      process.env.JWT_SECRET
    );
    return res.json({ token });
  } catch (error) {
    console.log('error',error); 
    // return res.json({ message: "server error" });
  }
});

//Cretating a  faceless chaneel
//1. go to chatGPT ask it to give you a scary story
//2. Then copy the story and go to Crayo.ai


router.post("/login", async (req, res) => {
  const { email, password } = req.body; 
  const checkUser = await pool.query(
    "SELECT * FROM users_infromation WHERE email = $1",
    [email]
  );
  if (!checkUser) {
    res.json({ message: "User is not registered yet" });
  }

  const user = checkUser.rows.length[0];
  const isValid = await bcryptjs.compare(password, user.password);
  if (isValid) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
  } else {
    return res.json({ message: "Password is incorrect " });
  }
  res.json({ status: true, message: "login successfully" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const checkEmail = await pool.query(
      "SELECT * FROM users_information WHERE email = $1",
      [email]
    );
    if (!checkEmail) {
      res.json({ message: "user not found" });
    }
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info@gmail.com",
        pass: "Iyare2468#",
      },
    });

    let mailOptions = {
      from: "loneperky@gmail.com",
      to: email,
      subject: "Here is your Password reset link",
      text: "",
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent" + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

export { router as auth };
