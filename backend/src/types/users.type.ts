export interface User {
  _id: string;
  email: string;
  spendableTokens: number;
  holdings: Holding[];
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

export interface Holding {
  stockId: string;
  quantity: number;
}