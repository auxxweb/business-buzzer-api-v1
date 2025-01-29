import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: {
    _id?: string;
    name?: string;
    email?: string;
    status?: string;
  };
}
export interface RequestWithFreeList extends Request {
  user?:any
}

export interface sendMailData {
  to: string;
  text: string;
  subject: string;
}
