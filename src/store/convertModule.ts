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
                const apiUrl =
                    process.env[`VUE_APP_${selectedBank.toUpperCase()}_URL`];
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
                    error.response && error.response.status === 429
                        ? console.log('Too many requests')
                        : console.error(error);
                }
            }
        },
        fetchCurrenciesHistory: async ({ commit }) => {
            try {
                const response = await axios.get(
                    process.env.VUE_APP_GETLISTARR_URL,
                );
                // Предполагаем, что данные в ответе уже в нужном формате
                commit('setCurrenciesHistory', response.data);
            } catch (error: any) {
                console.error('Error fetching currency history:', error);
                // Обрабатываем разные типы ошибок, например:
                if (error.response) {
                    // Запрос был сделан и сервер ответил с статус кодом, который выходит за рамки диапазона 2xx
                    console.error('Error Status:', error.response.status);
                    console.error('Error Data:', error.response.data);
                } else if (error.request) {
                    // Запрос был сделан, но ответ не был получен
                    console.error('No response received:', error.request);
                } else {
                    // Ошибка была вызвана во время настройки запроса
                    console.error('Error:', error.message);
                }
            }
        },
        postConvertListItemToHistoryArray: async ({ commit, state }) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const requestBody = {
                TransactionsDetail: state.convertListItem,
            };
            try {
                await axios.post(
                    process.env.VUE_APP_POSTLISTARR_URL,
                    requestBody,
                    config,
                );
            } catch (error) {
                console.error('Error posting currency history:', error);
            }
        },
        deleteCurrenciesHistory: async ({ commit }) => {
            const url = process.env.VUE_APP_DELETELISTARR_URL;
            // console.log('URL used for deleting:', url); // Проверьте выводимое значение URL
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

// const config = {
//     headers: {
//         'Content-Type': 'application/json',
//     },
// };
// const requestBody = {
//     TransactionsDetail: state.convertListItem,
// };

// axios.post(
//     process.env.VUE_APP_POSTLISTARR_URL,
//     requestBody,
//     config,
// );
