export interface trades {
    _id: string;
    userId: string;
    stockId: string;
    quantity: number;
    price: number;
    tradeType: 'BUY' | 'SELL';
    createdAt: Date;
    updatedAt: Date;
}