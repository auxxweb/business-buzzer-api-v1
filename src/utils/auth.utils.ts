import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { appConfig } from "../config/appConfig.js";
import { NextFunction, Response } from "express";

export const generateToken = async (
  data: any,
  expiryTime?: string | number,
): Promise<string> => {
  const options = {
    expiresIn: expiryTime ?? "7d",
  };
  return jwt.sign({ ...data }, appConfig.jwtSecret, options);
};

export const decodeToken = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  let token: any;
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).send({ message: "Not Authorized,No token" });
      }

      const decoded: any = jwt.verify(token, appConfig.jwtSecret);

      if (decoded) {
        return decoded;
      }

      next();
    } catch (error) {
      res.status(401).send({ message: "Not Authorized" });
    }
  }
  if (!token) {
    res.status(401).send({ message: "Not Authorized,No token" });
  }
};

export const verifyValue = async (
  value: string,
  hashedValue: string,
): Promise<boolean> => {
  return await bcrypt.compare(value, hashedValue);
};
