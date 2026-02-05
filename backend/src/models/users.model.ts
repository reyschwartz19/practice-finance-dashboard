import { Schema, model, Types, Document } from "mongoose";

export interface UserDocument extends Document{
    username: string;
    password: string;
    email: string;
    spendableTokens: number;
    holdings: {
        stockId: Types.ObjectId;
        quantity: number;
    }[];
    role: "USER" | "ADMIN";
    refreshToken?: string| null;
    createdAt: Date;
    updatedAt: Date;
}

const HoldingSchema = new Schema(
    {
      stockId: { type: Types.ObjectId, ref: "Stock", required: true },
      quantity: { type: Number, required: true, min: 0 },

    },
    {_id: false}
)

const userSchema = new Schema<UserDocument>(
    {
        username: { type: String, required: true, trim: true },
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        password: { type: String, required: true, select: false },
        holdings:  { type: [HoldingSchema], default: [] },
        role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
        spendableTokens: {type: Number, default: 500, min: 0},
        refreshToken: { type: String, default: null }
    },
    { timestamps: true}
)
export const UserModel = model("User", userSchema);