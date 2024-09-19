import { Module } from 'vuex';
import axios from 'axios';
import { currenciesMap } from '@/assets/constants/currenciesMap';
import { transactionApi } from '@/api/apiEndpoints';

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

            if (rateBuy === 0 || rateSell === 0 || amount === 0) {
                state.result = 0;
                return;
            }

            const result =
                state.radioInput === 'rateBuy'
                    ? amount / rateBuy || amount / rateExchange
                    : amount * rateSell || amount * rateExchange;
            const fixedResult = result.toFixed(2);

            if (!isFinite(result)) {
                console.error('Ошибка: Бесконечный результат');
                state.result = 0;
            } else {
                state.result = Number(fixedResult);
            }
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
        },
    },
    actions: {
        fetchCurrencies: async ({ commit, state }) => {
            const selectedBank = state.selectedBank as string;

            if (selectedBank) {
                const apiUrl = process.env[
                    `VUE_APP_${selectedBank.toUpperCase()}_URL`
                ] as string;

                try {
                    const response = await axios.get(apiUrl);
                    const currencies = response.data;

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
                const response = await axios.get(transactionApi.getList());
                const sortedData = response.data.sort((a: any, b: any) =>
                    a._id > b._id ? 1 : -1,
                );
                commit('setCurrenciesHistory', sortedData);
            } catch (error: any) {
                console.error(
                    'Error fetching currency history:',
                    error?.message || error,
                );
                if (error?.response) {
                    console.error(`Error Status: ${error.response.status}`);
                    console.error('Error Data:', error.response.data);
                }
            }
        },
        postConvertListItemToHistoryArray: async ({ state }) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const url = transactionApi.postList();
            const requestBody = {
                TransactionsDetail: state.convertListItem,
            };
            try {
                await axios.post(url, requestBody, config);
            } catch (error) {
                console.error('Error posting currency history:', error);
            }
        },
        deleteCurrenciesHistory: async ({ commit }) => {
            const url = transactionApi.deleteList();
            try {
                await axios.delete(url);
                commit('cleanCurrenciesHistory');
            } catch (error) {
                console.error('Error clearing currency history:', error);
            }
        },
    },
    namespaced: true,
};

export default amountModule;
