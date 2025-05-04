import { Module } from 'vuex';
import axios from 'axios';
import { apiEndpoints } from '@/api/apiEndpoints';
import { Receipt, RawReceiptsInput, QuarterData } from '@/interfaces/receipts';
import {
    parseReceiptsFromStrings,
    sortReceiptsByDate,
} from '@/utils/receiptUtils';

export interface ReceiptsState {
    receipts: Receipt[];
    previousQuartersReceipts: Receipt[];
    users: string[];
    availableYears: number[];
    availableQuarters: string[];
    exchangeRate: number;
    selectedUser: string | null;
    selectedYear: string | null;
    selectedQuarter: string | null;
    incomeTaxPayment: number;
    milFeePayment: number;
    incomeTaxDetails: {
        RecipientEDRPOU: string;
        RecipientName: string;
        Account: string;
        AccountName: string;
    };
    milFeeDetails: {
        RecipientEDRPOU: string;
        RecipientName: string;
        Account: string;
        AccountName: string;
    };
}

const receiptsModule: Module<ReceiptsState, any> = {
    state: () => ({
        receipts: [],
        previousQuartersReceipts: [],
        users: [],
        availableYears: [],
        availableQuarters: [],
        exchangeRate: 0,
        selectedUser: null,
        selectedYear: null,
        selectedQuarter: null,
        incomeTaxPayment: 0,
        milFeePayment: 0,
        incomeTaxDetails: {
            RecipientEDRPOU: '',
            RecipientName: '',
            Account: '',
            AccountName: '',
        },
        milFeeDetails: {
            RecipientEDRPOU: '',
            RecipientName: '',
            Account: '',
            AccountName: '',
        },
    }),
    getters: {
        filteredReceiptsByYear: (state) => (year: number) => {
            return state.receipts.filter((receipt: Receipt) => {
                const receiptDate = new Date(receipt.date);
                console.log('Receipt Date: ', receiptDate);
                return receiptDate.getFullYear() === year;
            });
        },

        getPreviousQuartersReceipts: (state) => {
            return state.previousQuartersReceipts;
        },

        receiptsByQuarter: (state) => () => {
            const quarters: Receipt[][] = [[], [], [], []];

            state.receipts.forEach((receipt: Receipt) => {
                const receiptDate = new Date(receipt.date);
                const quarterIndex = Math.floor(receiptDate.getMonth() / 3);
                quarters[quarterIndex].push(receipt);
            });

            return quarters.map((quarterReceipts, index) => ({
                QuarterName: `Q${index + 1}`,
                Receipts: quarterReceipts,
            }));
        },

        getExchangeRate: (state) => state.exchangeRate,

        getSelectedUser: (state) => state.selectedUser,

        getSelectedYear: (state) => state.selectedYear,

        getSelectedQuarter: (state) => state.selectedQuarter,

        getAvailableYears: (state) => state.availableYears,

        getAvailableQuarters: (state) => state.availableQuarters,

        getUsers: (state) => state.users,
    },
    mutations: {
        setReceipts: (state, rawReceiptsData: RawReceiptsInput) => {
            let receiptStrings: string[] = [];

            if (
                rawReceiptsData.length &&
                typeof rawReceiptsData[0] === 'string'
            ) {
                receiptStrings = rawReceiptsData as string[];
            } else {
                receiptStrings = (rawReceiptsData as QuarterData[]).flatMap(
                    (quarterData) => {
                        if (
                            quarterData.Receipts &&
                            Array.isArray(quarterData.Receipts)
                        ) {
                            return quarterData.Receipts;
                        } else {
                            console.error('Invalid quarter data:', quarterData);
                            return [];
                        }
                    },
                );
            }

            const parsedReceipts: Receipt[] =
                parseReceiptsFromStrings(receiptStrings);

            state.receipts = sortReceiptsByDate(parsedReceipts);
        },

        setPreviousQuartersReceipts: (state, receipts: Receipt[]) => {
            state.previousQuartersReceipts = [];
            state.previousQuartersReceipts = receipts;
        },

        setAvailableYears: (state, years: number[]) => {
            state.availableYears = years;
        },

        setAvailableQuarters: (state, quarters: string[]) => {
            state.availableQuarters = quarters;
        },

        setExchangeRate: (state, rate: number) => {
            state.exchangeRate = rate;
        },

        setSelectedUser: (state, user: string) => {
            state.selectedUser = user;
        },

        setSelectedYear: (state, year: string) => {
            state.selectedYear = year;
        },

        setSelectedQuarter: (state, quarter: string) => {
            state.selectedQuarter = quarter;
        },

        setUsers: (state, users: string[]) => {
            state.users = users;
        },

        setIncomeTaxPayment(state, incomeTaxPayment) {
            state.incomeTaxPayment = incomeTaxPayment;
        },

        setMilFeePayment(state, milFeePayment) {
            state.milFeePayment = milFeePayment;
        },

        setIncomeTaxDetails(state, incomeTaxDetails) {
            state.incomeTaxDetails = incomeTaxDetails;
        },

        setMilFeeDetails(state, milFeeDetails) {
            state.milFeeDetails = milFeeDetails;
        },
    },
    actions: {
        async fetchAllUsers({ commit }) {
            try {
                const response = await axios.get(apiEndpoints.getAllUsers());
                commit('setUsers', response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },

        async fetchUserYears({ commit }, userId: string) {
            try {
                const response = await axios.get(
                    apiEndpoints.getUserYears(userId),
                );
                commit('setAvailableYears', response.data);
            } catch (error) {
                console.error('Error fetching years:', error);
            }
        },

        async fetchQuarters({ commit }, { userId, year }) {
            try {
                const response = await axios.get(
                    apiEndpoints.getQuartersByYear(userId, year),
                );
                commit('setAvailableQuarters', response.data);
            } catch (error) {
                console.error('Error fetching quarters:', error);
            }
        },

        async fetchReceiptsByYear({ commit }, { userId, year }) {
            try {
                const response = await axios.get(
                    apiEndpoints.getUserReceipts(userId, year),
                );

                if (Array.isArray(response.data)) {
                    commit('setReceipts', response.data);
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching receipts by year:', error);
            }
        },

        async fetchReceipts({ commit }, { userId, year, quarter }) {
            try {
                const response = await axios.get(
                    apiEndpoints.getQuarterReceipts(userId, year, quarter),
                );
                commit('setReceipts', response.data);
            } catch (error) {
                console.error('Error fetching receipts:', error);
            }
        },

        async fetchPreviousQuartersReceipts(
            { commit },
            { userId, year, quarter },
        ) {
            try {
                const response = await axios.get(
                    apiEndpoints.getReceiptsBeforeQuarter(
                        userId,
                        year,
                        quarter,
                    ),
                );

                const parsedReceipts = parseReceiptsFromStrings(response.data);

                commit('setPreviousQuartersReceipts', parsedReceipts);
                return parsedReceipts;
            } catch (error) {
                console.error(
                    'Error fetching previous quarters receipts:',
                    error,
                );
                return [];
            }
        },

        async fetchCurrencyRate({ commit }, { currency, date }) {
            try {
                const url = `${apiEndpoints.getCurrencyRateByDate(date)}`;
                const response = await axios.get(url);
                const rates = response.data;
                const selectedRate = rates.find(
                    (rate: any) => rate.cc === currency,
                );
                if (selectedRate) {
                    commit('setExchangeRate', selectedRate.rate);
                }
            } catch (error) {
                console.error('Error fetching currency rate:', error);
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

            const url = apiEndpoints.sendUserReceipt(
                state.selectedUser,
                year,
                `Q${quarter}`,
            );

            try {
                await axios.post(url, JSON.stringify(receiptString), {
                    headers: {
                        'Content-Type': 'application/json-patch+json',
                    },
                });
            } catch (error) {
                console.error('Error sending receipt:', error);
            }
        },

        async fetchYearsAndTaxDetails({ commit }, userId: string) {
            try {
                const [
                    yearsResponse,
                    incomeTaxDetailsResponse,
                    incomeMilFeeResponse,
                ] = await Promise.all([
                    axios.get(apiEndpoints.getUserYears(userId)),
                    axios.get(apiEndpoints.getIncomeTaxDetails(userId)),
                    axios.get(apiEndpoints.getMilFeeDetails(userId)),
                ]);
                commit('setAvailableYears', yearsResponse.data);
                commit('setIncomeTaxDetails', incomeTaxDetailsResponse.data);
                commit('setMilFeeDetails', incomeMilFeeResponse.data);
                console.log(incomeTaxDetailsResponse.data);
                console.log(incomeMilFeeResponse.data);
            } catch (error) {
                console.error('Error fetching years and tax details:', error);
            }
        },

        async fetchQuarterData({ commit }, { userId, year, quarter }) {
            try {
                const response = await axios.get(
                    apiEndpoints.getSpecificQuarterData(userId, year, quarter),
                );
                const receipts = response.data;
                const totalAmount = receipts.reduce(
                    (sum: number, receipt: string) => {
                        const match = receipt.match(/-(\s*\d+(\.\d+)?)\sUAH/);
                        return match ? sum + parseFloat(match[1]) : sum;
                    },
                    0,
                );
                const incomeTaxPayment = parseFloat(
                    (totalAmount * 0.05).toFixed(2),
                );
                commit('setIncomeTaxPayment', incomeTaxPayment);

                const milFeePayment = parseFloat(
                    (totalAmount * 0.01).toFixed(2),
                );
                commit('setMilFeePayment', milFeePayment);
            } catch (error) {
                console.error('Error fetching quarter data:', error);
            }
        },
    },
    namespaced: true,
};

export default receiptsModule;
