import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/appConfig.js";
import { RequestWithUser } from "../interface/app.interface.js";
// import User from "../modules/business/business.model.js";
import { errorMessages } from "../constants/messages.js";
import { ObjectId } from "../constants/type.js";
import Business from "../modules/business/business.model.js";
import Admin from "../modules/admin/admin.model.js";

export const protect = ({ isAdmin = false }: { isAdmin: boolean }) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let token: any;

    if (req.headers.authorization?.startsWith("Bearer") === true) {
      try {
        token = req.headers.authorization.split(" ")[1];
        let decoded: any = {};

        decoded = jwt.verify(token, appConfig.jwtSecret);

        if (decoded) {
          let user: any;

          if (isAdmin) {
            user = await Admin.findOne({
              _id: new ObjectId(decoded?.id),
              isDeleted: false,
            }).select("status _id");

            req.user = user;
            next();
          } else {
            user = await Business.findOne({
              _id: new ObjectId(decoded?.id),
              isDeleted: false,
            }).select("status _id");
            console.log(user, "user-token-details");

            if (!user?.status) {
              res
                .status(401)
                .send({ message: errorMessages.userAccountBlocked });
            }

            req.user = user;
            next();
          }

          // const user: any = await Business.findOne({
          //   _id: new ObjectId(decoded?.id),
          //   isDeleted: false,
          // }).select('-password')

          // if (!user?.status) {
          //   res.status(401).send({ message: errorMessages.userAccountBlocked })
          // }

          // eslint-disable-next-line security/detect-possible-timing-attacks

          //   if (allowedRoles == null) {
          //     req.user = user
          //     next()
          //   } else if (user && allowedRoles.includes(user.role)) {
          //     req.user = user
          //     next()
          //   } else {
          //     res.status(403).send({ message: 'Forbidden' })
          //   }
          // } else {
          //   res.status(401).send({ message: 'Unauthorized' })
        }
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          console.error("Token has expired", error);
          return res.status(401).send({ message: "Token has expired" });
        } else {
          console.error("Error verifying token", error);
          return res.status(401).send({ message: "Unauthorized" });
        }
      }
    }
    if (!token) {
      res.status(401).send({ message: "Unauthorized, No token" });
    }
  };
};
// export const optionalProtect = (allowedRoles?: string[]) => {
//   return async (req: RequestWithUser, res: Response, next: NextFunction) => {
//     let token: any;

//     if (
//       req?.headers?.authorization?.startsWith("Bearer") === true &&
//       req.headers.authorization.split(" ")[1]
//     ) {
//       console.log(req.headers.authorization.split(" ")[1], "calling.....");

//       try {
//         token = req.headers.authorization.split(" ")[1];
//         let decoded: any = {};

//         decoded = jwt.verify(token, appConfig.jwtSecret);

//         if (decoded) {
//           const user: any = await User.findOne({
//             _id: new ObjectId(decoded?.id),
//             isDeleted: false,
//           }).select("-password");

//           if (allowedRoles == null) {
//             req.user = user;
//             next();
//           } else if (user && allowedRoles.includes(user.role)) {
//             req.user = user;
//             next();
//           } else {
//             res.status(403).send({ message: "Forbidden" });
//           }
//         } else {
//           res.status(401).send({ message: "Unauthorized" });
//         }
//       } catch (error) {
//         console.error(error);
//         res.status(401).send({ message: "Unauthorized" });
//       }
//     } else {
//       next();
//     }
//     // if (!token) {
//     //   res.status(401).send({ message: "Unauthorized, No token" });
//     // }
//   };
// };

export const authMiddleware = { protect };
