import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { RegisterDTO, loginDTO } from '../types/auth.type';
import dotenv from 'dotenv';
dotenv.config();

export class AuthService{
    static async register(data: RegisterDTO){
        const existingUser = await UserRepository.findUserByEmail(data.email);
        if(existingUser){
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await UserRepository.createUser(
            data.username,
            data.email,
            hashedPassword
        );
        return {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        };
    }
    static async login(data: loginDTO){
        const user = await UserRepository.findUserByEmail(data.email);
        if(!user){
            throw new Error('Invalid email or password');
        }
        const passwordMatch = await bcrypt.compare(data.password, user.password);
        if(!passwordMatch){
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.JWT_SECRET as string,
            { expiresIn: "15m"}
        );

        return {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }
    }
}