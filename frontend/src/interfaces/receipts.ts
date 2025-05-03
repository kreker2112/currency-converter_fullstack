export interface Receipt {
    amount: number;
    currency: string;
    uahAmount: number;
    date: string;
    quarter: string;
}

export interface Quarter {
    QuarterName: string;
    Receipts: string[];
}

export interface QuarterData {
    Receipts: string[];
}

export type RawReceiptsInput = string[] | QuarterData[];
