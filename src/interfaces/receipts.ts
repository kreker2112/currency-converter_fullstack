export interface Receipt {
    amount: number;
    currency: string;
    uahAmount: number;
    date: string;
}

export interface Quarter {
    QuarterName: string;
    Receipts: string[];
}
