import { Schema, model, Types } from "mongoose";

const HoldingSchema = new Schema(
    {
      stockId: { type: Types.ObjectId, ref: "Stock", required: true },
      quantity: { type: Number, required: true, min: 0 },

    },
    {_id: false}
)

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        passwordHash: { type: String, required: true, select: false },
        holdings:  { type: [HoldingSchema], default: [] },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        spendableTokens: {type: Number, default: 500, min: 0}
    },
    { timestamps: true}
)
export const User = model("User", userSchema);