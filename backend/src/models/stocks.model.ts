import { Schema, model } from "mongoose";

const StockSchema = new Schema(
    {
        symbol: {type: String, required: true},
        name: {type: String, required: true},
        price: {type: Number, required: true},
        isActive: {type: Boolean, default: true},
    },
    { timestamps: true
    }
)

export const Stock = model("Stock", StockSchema);