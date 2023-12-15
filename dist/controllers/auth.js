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
exports.verifyController = exports.signupController = exports.resetPasswordController = exports.forgotPasswordController = exports.loginController = exports.registerController = exports.invitationController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const errorHandlers_1 = require("../utils/errorHandlers");
const bcryptHandlers_1 = require("../utils/bcryptHandlers");
const jwtHandlers_1 = require("../utils/jwtHandlers");
const config_1 = require("../config/config");
const JWT_SECRET = config_1.config.jwt_secret || "secret";
/* Handles a signup user request */
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, jsonwebtoken_1.sign)(req.body, JWT_SECRET, { expiresIn: "24h" });
        const { firstName } = req.body;
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
            from: "Auth-Template: Verify your email",
            to: req.body.email,
            subject: "Verify your email ✔",
            html: `
        <b>Verify your email: ${firstName}</b>
        <p>To complete your registration, please click on the following link:</p>
        <a href="${config_1.config.frontend_url}/verify/${token}">Complete your registration</a>
      `,
        });
        res.send({ message: "Invitation sent" });
    }
    catch (error) {
        (0, errorHandlers_1.handleHttpError)(res, "Error signup user");
    }
});
exports.signupController = signupController;
/* Handles a verify user email request */
const verifyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const decodedToken = (0, jsonwebtoken_1.decode)(token);
        let newUser;
        if (typeof decodedToken === "object" && decodedToken !== null) {
            const encryptedPassword = yield (0, bcryptHandlers_1.encrypt)(decodedToken.password);
            newUser = {
                email: decodedToken.email,
                password: encryptedPassword,
                firstName: decodedToken.firstName,
                lastName: decodedToken.lastName,
                status: "active",
                role: decodedToken.role,
            };
        }
        const response = yield user_1.default.create(Object.assign({ id: (0, uuid_1.v4)() }, newUser));
        res.send(response);
    }
    catch (error) {
        (0, errorHandlers_1.handleHttpError)(res, "Error verify user");
    }
});
exports.verifyController = verifyController;
/* Handles a invitation user request */
const invitationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, jsonwebtoken_1.sign)(req.body, JWT_SECRET, { expiresIn: "24h" });
        const { firstName } = req.body;
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
            subject: "Complete your registration ✔",
            html: `
        <b>Complete your registration ${firstName}</b>
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
/* Handles a register request and create a user with password encripted */
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, password } = req.body;
        const decodedToken = (0, jsonwebtoken_1.decode)(token);
        const encryptedPassword = yield (0, bcryptHandlers_1.encrypt)(password);
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
        const response = yield user_1.default.create(Object.assign({ id: (0, uuid_1.v4)() }, newUser));
        res.send(response);
    }
    catch (error) {
        (0, errorHandlers_1.handleHttpError)(res, "Error creating user");
    }
});
exports.registerController = registerController;
/* Handles a login request and verify the password */
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_1.default.findOne({
            email: req.body.email,
        });
        if (currentUser) {
            const isPasswordCorrect = yield (0, bcryptHandlers_1.verify)(req.body.password, currentUser.password);
            const isUserActive = currentUser.status === "active";
            if (!isUserActive) {
                res.status(400);
                res.send({ message: "User is not active" });
                return;
            }
            if (isPasswordCorrect) {
                const token = yield (0, jwtHandlers_1.generateToken)(currentUser._id.toString());
                const role = yield role_1.default.findOne({ id: currentUser.role }, { name: 1 });
                const transformedUser = Object.assign(Object.assign({}, currentUser.toObject()), { token,
                    role });
                res.send(transformedUser);
            }
            else {
                res.status(400);
                res.send({ message: "Invalid email or password" });
            }
        }
        else {
            res.status(400);
            res.send({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        (0, errorHandlers_1.handleHttpError)(res, "Error login user");
    }
});
exports.loginController = loginController;
/* Handles a forgot password email */
const forgotPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, jsonwebtoken_1.sign)({ email: req.body.email }, JWT_SECRET, {
            expiresIn: "24h",
        });
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
            from: "Auth Template - Forgot Password",
            to: req.body.email,
            subject: "Recover your password ✔",
            html: `
        <b>Recover your password</b>
        <p>To recover your password, please click on the following link:</p>
        <a href="${config_1.config.frontend_url}/change-password/${token}">Recover your password</a>
      `,
        });
        res.send({ message: "Email sent" });
    }
    catch (error) {
        (0, errorHandlers_1.handleHttpError)(res, "Error forgot password");
    }
});
exports.forgotPasswordController = forgotPasswordController;
/* Change a password and validate current token */
const resetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, password } = req.body;
        const decodedToken = (0, jsonwebtoken_1.decode)(token);
        let currentUser;
        if (typeof decodedToken === "object" && decodedToken !== null) {
            currentUser = yield user_1.default.findOne({ email: decodedToken.email });
        }
        if (currentUser) {
            const encryptedPassword = yield (0, bcryptHandlers_1.encrypt)(password);
            const response = yield user_1.default.findOneAndUpdate({ _id: currentUser._id }, { password: encryptedPassword }, { new: true });
            res.send(response);
        }
    }
    catch (error) {
        (0, errorHandlers_1.handleHttpError)(res, "Error reset password");
    }
});
exports.resetPasswordController = resetPasswordController;
//# sourceMappingURL=auth.js.map