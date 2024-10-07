import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: {
    _id?: string;
    name?: string;
    email?: string;
    status?: string;
  };
}

export interface sendMailData {
  to: string;
  text: string;
  subject: string;
}
