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
    currencyObject: { rateBuy: number; rateSell: number };
    result: number;
    convertListItem: string;
}

const amountModule: Module<AmountState, any> = {
    state: () => ({
        amount: '',
        currenciesHistory: [],
        cachedCurrencies: [],
        optionInput: '',
        radioInput: '',
        currencyCode: 0,
        currencyObject: { rateBuy: 0, rateSell: 0 },
        result: 0,
        convertListItem: '',
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
    },
    mutations: {
        setAmount: (state, amount: string) => (state.amount = amount),
        cleanCurrenciesHistory: (state) => (state.currenciesHistory = []),
        setCachedCurrencies: (state, currencies) => {
            state.cachedCurrencies = currencies;
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
                    item.currencyCodeA === currencyCodeForSearch &&
                    item.currencyCodeB === 980
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
            const rateBuy = currencyObjectForCalculate.rateBuy;
            const rateSell = currencyObjectForCalculate.rateSell;
            const result =
                state.radioInput === 'rateBuy'
                    ? amount / rateBuy
                    : amount * rateSell;
            const fixedResult = result.toFixed(2);
            state.result = Number(fixedResult);
        },
        makeConvertListItem: (state) => {
            const amount = state.amount;
            const currency = state.optionInput;
            const currencyFrom: string =
                state.radioInput === 'rateBuy' ? 'UAH' : currency;
            const currencyTo: string =
                state.radioInput === 'rateBuy' ? currency : 'UAH';
            const resultForItem = state.result;
            const itemForHistory = `${amount} ${currencyFrom} = ${resultForItem} ${currencyTo}`;
            localStorage.setItem('convertListItem', itemForHistory);
            state.convertListItem = itemForHistory;
        },
        addConvertListItemToHistoryArray(state): void {
            const convertListItemsArray: string[] =
                JSON.parse(
                    localStorage.getItem('convertListItemsArray') as string,
                ) || [];
            state.currenciesHistory = convertListItemsArray;
            if (state.convertListItem) {
                convertListItemsArray.push(state.convertListItem);

                localStorage.setItem(
                    'convertListItemsArray',
                    JSON.stringify(convertListItemsArray),
                );
            }
        },
    },
    actions: {
        fetchCurrencies: async ({ commit }) => {
            try {
                const response = await axios.get(
                    'https://api.monobank.ua/bank/currency',
                );
                const currencies = response.data;
                commit('setCachedCurrencies', currencies);
            } catch (error: any) {
                error.response.status === 429
                    ? console.log('Too many requests')
                    : console.error(error);
            }
        },
    },
    namespaced: true,
};

export default amountModule;
