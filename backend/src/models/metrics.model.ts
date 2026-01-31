import { Schema, model } from "mongoose";

const MonthlyMetricSchema = new Schema(
    {
        periodStart: { type: Date, required: true, unique: true },
        totalVolume: { type: Number, required: true },
        totalTrades: { type: Number, required: true },
        activeTraders: { type: Number, required: true },
    },
    { timestamps: true

    }
)
export const MonthlyMetric = model("MonthlyMetric", MonthlyMetricSchema);