import  jwt from  "jsonwebtoken";
export const SECRET = 'jaikumar_mohite12062003';
import {Request , Response , NextFunction} from "express";
export const authenticateJwt = (req:Request , res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        if(!user ){
          return res.sendStatus(403);
        }
        if(typeof user !==  "string"){
          return  res.sendStatus(403);
        }
        req.headers["user"] = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
