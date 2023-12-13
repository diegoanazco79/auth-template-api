import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { decode, sign } from "jsonwebtoken";
import { Request, Response } from "express";

import UserModel from "../models/user";
import RoleModel from "../models/role";

import { handleHttpError } from "../utils/errorHandlers";
import { encrypt, verify } from "../utils/bcryptHandlers";
import { generateToken } from "../utils/jwtHandlers";

import { config } from "../config/config";

const JWT_SECRET = config.jwt_secret || "secret";

/* Handles a invitation user request */
const invitationController = async (req: Request, res: Response) => {
  try {
    const token = sign(req.body, JWT_SECRET, { expiresIn: "24h" });
    const { username } = req.body;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.google_gmail.email,
        pass: config.google_gmail.password,
      },
    });

    await transporter.sendMail({
      from: "Auth-Template Invitation: Complete your registration",
      to: req.body.email,
      subject: "Complete tu registro ✔",
      html: `
        <b>Complete your registration ${username}</b>
        <p>To complete your registration, please click on the following link:</p>
        <a href="${config.frontend_url}/register/${token}">Complete your registration</a>
      `,
    });

    res.send({ message: "Invitation sent" });
  } catch (error) {
    handleHttpError(res, "Error sending invitation");
  }
};

/* Handles a register request and create a user with password encripted */
const registerController = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    const decodedToken = decode(token);
    const encryptedPassword = await encrypt(password);

    let newUser;

    if (typeof decodedToken === "object" && decodedToken !== null) {
      newUser = {
        email: decodedToken.email,
        password: encryptedPassword,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        status: "active",
        role: decodedToken.role,
      };
    }

    const response = await UserModel.create({ id: uuidv4(), ...newUser });
    res.send(response);
  } catch (error) {
    handleHttpError(res, "Error creating user");
  }
};

/* Handles a login request and verify the password */
const loginController = async (req: Request, res: Response) => {
  try {
    const currentUser = await UserModel.findOne({
      email: req.body.email,
    });
    if (currentUser) {
      const isPasswordCorrect = await verify(
        req.body.password,
        currentUser.password
      );

      const isUserActive = currentUser.status === "active";
      if (!isUserActive) {
        res.status(400);
        res.send({ message: "User is not active" });
        return;
      }

      if (isPasswordCorrect) {
        const token = await generateToken(currentUser._id.toString());

        const role = await RoleModel.findOne(
          { id: currentUser.role },
          { name: 1 }
        );

        const transformedUser = {
          ...currentUser.toObject(),
          token,
          role,
        };
        res.send(transformedUser);
      } else {
        res.status(400);
        res.send({ message: "Invalid email or password" });
      }
    } else {
      res.status(400);
      res.send({ message: "Invalid email or password" });
    }
  } catch (error) {
    handleHttpError(res, "Error login user");
  }
};

/* Handles a forgot password email */
const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const token = sign({ email: req.body.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.google_gmail.email,
        pass: config.google_gmail.password,
      },
    });

    await transporter.sendMail({
      from: "Auth Template - Forgot Password",
      to: req.body.email,
      subject: "Recover your password ✔",
      html: `
        <b>Recover your password</b>
        <p>To recover your password, please click on the following link:</p>
        <a href="${config.frontend_url}/change-password/${token}">Recover your password</a>
      `,
    });

    res.send({ message: "Email sent" });
  } catch (error) {
    handleHttpError(res, "Error forgot password");
  }
};

/* Change a password and validate current token */
const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    const decodedToken = decode(token);
    let currentUser;
    if (typeof decodedToken === "object" && decodedToken !== null) {
      currentUser = await UserModel.findOne({ email: decodedToken.email });
    }
    if (currentUser) {
      const encryptedPassword = await encrypt(password);
      const response = await UserModel.findOneAndUpdate(
        { _id: currentUser._id },
        { password: encryptedPassword },
        { new: true }
      );
      res.send(response);
    }
  } catch (error) {
    handleHttpError(res, "Error reset password");
  }
};

export {
  invitationController,
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
};
