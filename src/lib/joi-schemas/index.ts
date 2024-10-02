import { Request, Response, NextFunction } from "express";
import { AnySchema } from "joi";

const JoiValidator = (validationSchema: AnySchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const { error } = validationSchema.validate(data);
    // eslint-disable-next-line
    if (error) {
      return res.status(400).json({
        status: "failure",
        message: error.details.map((err) => err.message).join(", "),
      });
    }
    next();
  };
};

export { JoiValidator };
