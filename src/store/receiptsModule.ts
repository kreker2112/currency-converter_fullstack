import { Module } from 'vuex';
import axios from 'axios';
import { Receipt } from '@/interfaces/receipts';

export interface ReceiptsState {
    receipts: Receipt[];
    filterYear: number | null;
    exchangeRate: number;
    selectedUser: string | null;
}

const receiptsModule: Module<ReceiptsState, any> = {
    state: () => ({
        receipts: [],
        filterYear: null,
        exchangeRate: 0,
        selectedUser: null,
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
        getExchangeRate: (state) => state.exchangeRate,
        getSelectedUser: (state) => state.selectedUser,
    },
    mutations: {
        addReceipt: (state, receipt: Receipt) => {
            state.receipts.push(receipt);
        },
        setFilterYear: (state, year: number) => {
            state.filterYear = year;
        },
        setExchangeRate: (state, rate: number) => {
            state.exchangeRate = rate;
        },
        setSelectedUser: (state, user: string) => {
            state.selectedUser = user;
        },
    },
    actions: {
        async fetchCurrencyRate({ commit }, { currency, date }) {
            const baseUrl = process.env.VUE_APP_NBU_BY_DATE_URL;

            if (baseUrl && date) {
                const url = `${baseUrl}${date}&json`;
                try {
                    const response = await axios.get(url);
                    const rates = response.data;
                    const selectedRate = rates.find(
                        (rate: any) => rate.cc === currency,
                    );
                    if (selectedRate) {
                        commit('setExchangeRate', selectedRate.rate);
                    }
                } catch (error) {
                    console.error('Error getting exchange rate:', error);
                }
            } else {
                console.error(
                    'Error: URL to get exchange rate or date not defined.',
                );
            }
        },

        async sendReceipt({ state }, { amount, currency, date }) {
            const year = date.split('-')[0];
            const quarter = Math.floor(new Date(date).getMonth() / 3) + 1;
            const formattedDate = date.split('-').reverse().join('.');
            const uahAmount = (parseFloat(amount) * state.exchangeRate).toFixed(
                2,
            );

            const receiptString = `${formattedDate}: ${amount} ${currency} - ${uahAmount} UAH`;

            if (!state.selectedUser) {
                console.error('Error: No user selected');
                return;
            }

            const url = `${process.env.VUE_APP_GETUSERDATA_URL}${state.selectedUser}/receipts?year=${year}&quarter=Q${quarter}`;

            try {
                await axios.post(url, JSON.stringify(receiptString), {
                    headers: {
                        'Content-Type': 'application/json-patch+json',
                    },
                });
            } catch (error: any) {
                if (error.response) {
                    console.error(
                        'Error sending receipt:',
                        error.response.data.errors || error.response.data,
                    );
                } else {
                    console.error('Error sending receipt:', error.message);
                }
            }
        },
    },
    namespaced: true,
};

export default receiptsModule;
