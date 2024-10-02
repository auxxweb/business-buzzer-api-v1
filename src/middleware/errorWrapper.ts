// /**
//  *
//  * @param {*} fn
//  * @returns
//  */
/**  handles errors inside every req */

import { Response, Request, NextFunction } from "express";

const errorWrapper = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.log(err, "error");
      next(err);
    }
  };
};

export { errorWrapper };
