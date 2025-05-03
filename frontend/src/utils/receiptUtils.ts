import { Receipt } from '@/interfaces/receipts';

export function parseReceiptsFromStrings(receiptStrings: string[]): Receipt[] {
    return receiptStrings
        .map((receiptString: string) => {
            const [datePart, amountPart] = receiptString.split(':');
            if (!datePart || !amountPart) return null;

            const parts = amountPart.trim().split(' ');
            if (parts.length < 4) return null;

            const [amountStr, currency, , uahAmountStr] = parts;

            const amount = parseFloat(amountStr);
            const uahAmountMatch = uahAmountStr.match(/-?\d+(\.\d+)?/);
            const uahAmount = uahAmountMatch
                ? parseFloat(uahAmountMatch[0])
                : 0;

            const [day, month, year] = datePart.trim().split('.');
            const isoDate = `${year}-${month}-${day}`; // YYYY-MM-DD

            return {
                date: isoDate,
                amount: isNaN(amount) ? 0 : amount,
                currency,
                uahAmount,
            };
        })
        .filter((receipt): receipt is Receipt => receipt !== null);
}

export function sortReceiptsByDate(receipts: Receipt[]): Receipt[] {
    return receipts.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
}

export const calculateTotalFromReceipts = (receipts: Receipt[]): number => {
    let total = 0;
    receipts.forEach((receipt) => {
        if (receipt.uahAmount !== undefined) {
            total += receipt.uahAmount;
        } else {
            console.warn('UAH amount is missing in receipt:', receipt);
        }
    });
    console.log('Total UAH amount from receipts:', total);
    return total;
};
