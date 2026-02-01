import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterDTO, loginDTO } from "../types/auth.type";

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
}