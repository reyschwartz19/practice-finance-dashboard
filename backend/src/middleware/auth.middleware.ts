import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { jwtPayload } from "../types/auth.type";
dotenv.config();

export interface AuthRequest extends Request {
    user?: jwtPayload;
}

export class AuthMiddleware{
    static authenticate(req: AuthRequest, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message: 'Unauthorized'});
        }
        const token = authHeader.split(' ')[1];
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwtPayload;
            req.user = decoded;
            next();
        }catch{
            return res.status(401).json({message: 'Invalid token'});
        }
    }
}