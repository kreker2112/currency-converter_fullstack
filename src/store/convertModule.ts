import { Module } from 'vuex';
import axios from 'axios';
import { currenciesMap } from '@/assets/constants/currenciesMap';

export interface AmountState {
    amount: string;
    currenciesHistory: string[];
    cachedCurrencies: [];
    optionInput: string;
    radioInput: string;
    currencyCode: number;
    currencyObject: { rateBuy: number; rateSell: number; rate: number };
    result: number;
    convertListItem: string;
    selectedBank: string;
}

const amountModule: Module<AmountState, any> = {
    state: () => ({
        amount: '',
        currenciesHistory: [],
        cachedCurrencies: [],
        optionInput: '',
        radioInput: '',
        currencyCode: 0,
        currencyObject: { rateBuy: 0, rateSell: 0, rate: 0 },
        result: 0,
        convertListItem: '',
        selectedBank: '',
    }),
    getters: {
        getAmount: (state) => state.amount,
        getCurrenciesHistory: (state) => state.currenciesHistory,
        getCachedCurrencies: (state) => state.cachedCurrencies,
        getOptionInput: (state) => state.optionInput,
        getRadioInput: (state) => state.radioInput,
        getCurrencyCode: (state) => state.currencyCode,
        getCurrencyObject: (state) => state.currencyObject,
        getResult: (state) => state.result,
        getConvertListItem: (state) => state.convertListItem,
        getSelectedBank: (state) => state.selectedBank,
    },
    mutations: {
        setAmount: (state, amount: string) => (state.amount = amount),
        cleanCurrenciesHistory: (state) => (state.currenciesHistory = []),
        setCachedCurrencies: (state, currencies) => {
            state.cachedCurrencies = currencies;
        },
        setCurrenciesHistory: (state, currenciesHistory: string[]) => {
            state.currenciesHistory = currenciesHistory;
        },
        setOptionInput: (state, optionInput: string) => {
            state.optionInput = optionInput;
        },
        setValueInput: (state, valueInput: string) => {
            state.radioInput = valueInput;
        },
        findCurrencieCode: (state) => {
            const input: string = state.optionInput;
            const searchedCurrencyCode: any = Object.keys(currenciesMap).find(
                (key: string) => currenciesMap[parseInt(key)] === input,
            );
            const searchedCurrencyCodeInNumber: number =
                Number(searchedCurrencyCode);
            state.currencyCode = searchedCurrencyCodeInNumber;
        },
        findCurrencieWithCurrencyCode: (state) => {
            const currencies: [] = state.cachedCurrencies;
            const currencyCodeForSearch = state.currencyCode;
            currencies.find((item: any) => {
                if (
                    (item.currencyCodeA === currencyCodeForSearch &&
                        item.currencyCodeB === 980) ||
                    item.r030 === currencyCodeForSearch
                ) {
                    state.currencyObject = item;
                }
            });
        },
        calculateCurrency: (state) => {
            const currencyObjectForCalculate = {
                ...state.currencyObject,
            };
            const amount = Number(state.amount);
            const rateExchange = currencyObjectForCalculate.rate;
            const rateBuy = currencyObjectForCalculate.rateBuy;
            const rateSell = currencyObjectForCalculate.rateSell;
            const result =
                state.radioInput === 'rateBuy'
                    ? amount / rateBuy || amount / rateExchange
                    : amount * rateSell || amount * rateExchange;
            const fixedResult = result.toFixed(2);
            return (state.result = Number(fixedResult));
        },
        makeConvertListItem: (state) => {
            const amount = state.amount;
            const currency = state.optionInput;
            const selectedBank = state.selectedBank;
            const currencyFrom: string =
                state.radioInput === 'rateBuy' ? 'UAH' : currency;
            const currencyTo: string =
                state.radioInput === 'rateBuy' ? currency : 'UAH';
            const resultForItem = state.result;
            const itemForHistory = `${selectedBank.toUpperCase()}: ${amount} ${currencyFrom} = ${resultForItem} ${currencyTo}`;
            state.convertListItem = itemForHistory;
        },
        addConvertListItemToHistoryArray(state): void {
            const currenciesHistoryArray: string[] =
                state.currenciesHistory || [];
            if (state.convertListItem) {
                currenciesHistoryArray.unshift(state.convertListItem);
            }
        },
        setSelectedBank: (state, bank) => {
            state.selectedBank = bank;
            // console.log(state.selectedBank);
        },
    },
    actions: {
        fetchCurrencies: async ({ commit, state }) => {
            const selectedBank = state.selectedBank as string;
            // console.log('selectedBank: ', selectedBank);
            if (selectedBank) {
                const apiUrl = process.env[
                    `VUE_APP_${selectedBank.toUpperCase()}_URL`
                ] as string;
                // console.log('selectedBank: ', selectedBank.toUpperCase());
                // console.log('apiUrl: ', apiUrl);
                try {
                    const response = await axios.get(apiUrl);
                    // console.log('response: ', response);
                    const currencies = response.data;
                    // console.log('currencies: ', currencies);
                    // console.log('typeof currencies: ', typeof currencies);

                    commit('setCachedCurrencies', currencies);
                } catch (error: any) {
                    error.response.status === 429
                        ? console.log('Too many requests')
                        : console.error(error);
                }
            }
        },
        fetchCurrenciesHistory: async ({ commit }) => {
            try {
                const url = process.env.VUE_APP_GETLISTARR_URL;
                if (url) {
                    const response = await axios.get(url);
                    commit('setCurrenciesHistory', response.data);
                } else {
                    throw new Error('VUE_APP_GETLISTARR_URL is not defined');
                }
            } catch (error: any) {
                console.error('Error fetching currency history:', error);
                if (error.response) {
                    console.error('Error Status:', error.response.status);
                    console.error('Error Data:', error.response.data);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error:', error.message);
                }
            }
        },
        postConvertListItemToHistoryArray: async ({ state }) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const url = process.env.VUE_APP_POSTLISTARR_URL;
            if (url) {
                const requestBody = {
                    TransactionsDetail: state.convertListItem,
                };
                try {
                    await axios.post(url, requestBody, config);
                } catch (error) {
                    console.error('Error posting currency history:', error);
                }
            } else {
                console.error('URL is undefined');
            }
        },
        deleteCurrenciesHistory: async ({ commit }) => {
            const url = process.env.VUE_APP_DELETELISTARR_URL;
            if (url) {
                try {
                    await axios.delete(url);
                    commit('cleanCurrenciesHistory');
                } catch (error) {
                    console.error('Error clearing currency history:', error);
                }
            } else {
                console.error('URL is undefined');
            }
        },
    },
    namespaced: true,
};

export default amountModule;
