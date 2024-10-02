import { Response } from "express";

export interface CommonResponseType<T> {
  status: number;
  data: T | null;
  message?: string;
}
export interface CommonResponseTypeError<T> {
  status: number;
  data?: T | null;
  message?: string;
}

export const responseUtils = {
  success: <T>(
    resp: Response,
    { data, status = 200 }: CommonResponseType<T>,
  ) => {
    return resp.status(status).send({ data, success: true });
  },
  error: <T>(
    resp: Response,
    { data, status = 400, message }: CommonResponseTypeError<T>,
  ) => {
    return resp.status(status).send({ data, success: false, message });
  },
};

export const httpCodeUtils = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
