import { UserModel,UserDocument } from "../models/users.model";

export class UserRepository{
    static async createUser(
        username: string,
        email: string,
        hashedPassword: string
    ): Promise<UserDocument>{
        return UserModel.create({
            email,
            username,
            password: hashedPassword
        });
    }
    
    static async findUserByEmail(email: string): Promise<UserDocument | null>{
    return UserModel.findOne({email}).select('+password');
}

    static async findUserById(userId: string): Promise<UserDocument | null>{
        return UserModel.findById(userId);
    }

    static async saveRefreshToken(userId: string, refreshToken: string | null): Promise<UserDocument | null>{
        return UserModel.findByIdAndUpdate(userId, {refreshToken: refreshToken}, {new: true});
    }
}

