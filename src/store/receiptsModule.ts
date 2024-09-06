import { Module } from 'vuex';

interface Receipt {
    amount: number;
    currency: string;
    uahAmount: number;
    date: Date;
}

export interface ReceiptsState {
    receipts: Receipt[];
    filterYear: number | null;
}

const receiptsModule: Module<ReceiptsState, any> = {
    state: () => ({
        receipts: [],
        filterYear: null,
    }),
    getters: {
        filteredReceiptsByYear: (state) => {
            if (state.filterYear) {
                return state.receipts.filter(
                    (receipt: Receipt) =>
                        new Date(receipt.date).getFullYear() ===
                        state.filterYear,
                );
            }
            return state.receipts;
        },
        receiptsByQuarter: (state, getters) => {
            const receipts: Receipt[] = getters.filteredReceiptsByYear;
            const quarters: Receipt[][] = [[], [], [], []];

            receipts.forEach((receipt: Receipt) => {
                const month = new Date(receipt.date).getMonth();
                const quarter = Math.floor(month / 3);
                quarters[quarter].push(receipt);
            });

            return quarters;
        },
    },
    mutations: {
        addReceipt: (state, receipt: Receipt) => {
            state.receipts.push(receipt);
            console.log(state.receipts);
        },
        setFilterYear: (state, year: number) => {
            state.filterYear = year;
            console.log(state.filterYear);
        },
    },
    namespaced: true,
};

export default receiptsModule;
