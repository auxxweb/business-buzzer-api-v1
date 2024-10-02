import { Request, Response, NextFunction } from "express";

interface ErrorType extends Error {
  statusCode: number;
  errors: any;
  code: number;
  keyValue: any;
  value: number;
}
const errorHandler = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const customError = {
    statusCode: err.statusCode || 500,
    msg: err.message ?? "Something went wrong try again later",
    success: false,
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue,
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }
  console.log(err);

  return res.status(customError.statusCode ?? 400).json({
    message: customError.msg,
    status: "failure",
    success: customError.success,
  });
};

export default errorHandler;
