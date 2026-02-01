export interface Stock {
    _id: string;
    symbol: string;
    name: string;
    price: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
} 