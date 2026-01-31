import { Schema, model, Types } from "mongoose";

const tradesSchema = new Schema(
    {
        userId: { type: Types.ObjectId, ref: "User", required: true },
        stockId: { type: Types.ObjectId, ref: "Stock", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        tradeType: { type: String, enum: ['BUY', 'SELL'], required: true },
    },
    { timestamps: true
    }
)

export const Trades = model("Trades", tradesSchema);