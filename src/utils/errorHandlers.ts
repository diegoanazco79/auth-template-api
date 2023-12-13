import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Handles http errors and sends a response
 * @param res 
 * @param error 
 */
const handleHttpError = (res: Response, error: string) => {
  res.status(500);
  res.send({ error });
};

/**
 * Validates fields from request body
 * @param req 
 * @param res 
 * @param next 
 */
const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

/**
 * Sends an empty data response
 * @param res 
 * @param error 
 */
const emptyData = (res: Response, error: string) => {
  res.status(404);
  res.send({ error });
};

export { handleHttpError, validateFields, emptyData };
