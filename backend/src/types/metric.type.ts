export interface MonthlyMetric {
    _id: string;
    periodStart: Date;
    totalValue: number;
    totalTrades: number;
    activeTraders: number;
    createdAt: Date;
    updatedAt: Date;
}