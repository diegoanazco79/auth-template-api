"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitationController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = require("jsonwebtoken");
const errorHandlers_1 = require("../utils/errorHandlers");
const config_1 = require("../config/config");
const JWT_SECRET = config_1.config.jwt_secret || "secret";
/* Handles a invitation user request */
const invitationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, jsonwebtoken_1.sign)(req.body, JWT_SECRET, { expiresIn: "24h" });
        const { username } = req.body;
        let transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: config_1.config.google_gmail.email,
                pass: config_1.config.google_gmail.password,
            },
        });
        yield transporter.sendMail({
            from: "Auth-Template Invitation: Complete your registration",
            to: req.body.email,
            subject: "Complete tu registro ✔",
            html: `
        <b>Complete your registration ${username}</b>
        <p>To complete your registration, please click on the following link:</p>
        <a href="${config_1.config.frontend_url}/register/${token}">Complete your registration</a>
      `,
        });
        res.send({ message: "Invitation sent" });
    }
    catch (error) {
        (0, errorHandlers_1.handleHttpError)(res, "Error sending invitation");
    }
});
exports.invitationController = invitationController;
//# sourceMappingURL=auth.js.map