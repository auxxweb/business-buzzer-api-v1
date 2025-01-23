import {Request,Response, NextFunction } from "express";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { freeListService } from "./freelist.service.js";
import { getPaginationOptions } from "utils/pagination.utils.js";
import { FilterQuery } from "mongoose";
import FreeList from "./freelist.model.js";
import { ObjectId } from "constants/type.js";






const freeListSignUp = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await freeListService.freeListSignup({
        ...req.body,
      });
      console.log(req.body,'body daataaa')
  
      return responseUtils.success(res, {
        data,
        status: 201,
      });
    },
  );

  const getAllFreelist = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      // Directly call the service to fetch all freelist documents
      console.log(req.query, "query dataaaa");
    

      const data = await freeListService.getAllFreelist();
  
      // Return the response
      return responseUtils.success(res, {
        data,
        status: 200,
      });
    }
  );

  export {
    freeListSignUp,
    getAllFreelist
  };
  
