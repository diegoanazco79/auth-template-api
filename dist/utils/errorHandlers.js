"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyData = exports.validateFields = exports.handleHttpError = void 0;
const express_validator_1 = require("express-validator");
/**
 * Handles http errors and sends a response
 * @param res
 * @param error
 */
const handleHttpError = (res, error) => {
    res.status(500);
    res.send({ error });
};
exports.handleHttpError = handleHttpError;
/**
 * Validates fields from request body
 * @param req
 * @param res
 * @param next
 */
const validateFields = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validateFields = validateFields;
/**
 * Sends an empty data response
 * @param res
 * @param error
 */
const emptyData = (res, error) => {
    res.status(404);
    res.send({ error });
};
exports.emptyData = emptyData;
//# sourceMappingURL=errorHandlers.js.map