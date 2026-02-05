import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterDTO, loginDTO } from "../types/auth.type";
import { UserRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRequest } from "../middleware/auth.middleware";
dotenv.config();

export class AuthController{
    static async register(req: Request<{},{} , RegisterDTO>, res: Response){
        try{
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch(error: unknown){
            res.status(400).json({message: (error as Error).message});
        }
    }
    static async login(req: Request<{},{} , loginDTO>, res: Response){
        try{
            const result = await AuthService.login(req.body);
            res.status(200).json(result);
        }catch(error: unknown){
            res.status(400).json({message: (error as Error).message});
        }
    }
    static async refresh(req: Request<{},{}, {refreshToken: string}>, res: Response){
       
              const {refreshToken} = req.body;
              if(!refreshToken){
                return res.status(401).json({message: 'Unauthorized'});
              }
           try{
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN as string) as {userId: string};
            const user = await UserRepository.findUserById(decoded.userId);
            if(!user || user.refreshToken !== refreshToken){
                return res.status(403).json({message: 'Forbidden'});
            }
            const newToken = jwt.sign(
                {userId: user._id, role: user.role},
                process.env.JWT_SECRET as string,
                {expiresIn: '15m'}
            );
            return res.status(200).json({token: newToken});
           }catch{
            return res.status(403).json({message: 'Forbidden'});
           }
        
       
    }
    static async logout(req: AuthRequest, res: Response){
          try{
            const userId = req.user?.userId;
            if(!userId){
                return res.status(401).json({message: 'Unauthorized'});
            }
            await AuthService.logout(userId);
            return res.status(200).json({message: 'Logged out successfully'});
          } catch(error: unknown){
            res.status(500).json({message: 'Logout failed'});
          }
    }
}