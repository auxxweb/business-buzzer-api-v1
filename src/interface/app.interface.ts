import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    country?: string;
    industry?: string;
    position?: string;
    org?: string;
    status?: string;
    role?: string;
  };
}

export interface sendMailData {
  to: string;
  text: string;
  subject: string;
}
