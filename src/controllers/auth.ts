import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { decode, sign } from "jsonwebtoken";
import { Request, Response } from "express";

import UserModel from "../models/user";

import { handleHttpError } from "../utils/errorHandlers";
import { encrypt } from "../utils/bcryptHandlers";

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

export { invitationController, registerController };
