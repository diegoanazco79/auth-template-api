import nodemailer from "nodemailer";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";

import { handleHttpError } from "../utils/errorHandlers";
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

export { invitationController };
