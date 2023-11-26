import { Module } from 'vuex';

export interface AmountState {
    amount: string;
    currenciesHistory: [] | string;
}

const amountModule: Module<AmountState, any> = {
    state: () => ({ amount: '', currenciesHistory: [] }),
    getters: {
        getAmount: (state) => state.amount,
        getCurrenciesHistory: (state) => state.currenciesHistory,
    },
    mutations: {
        setAmount: (state, amount: string) => (state.amount = amount),
        setCurrenciesHistory: (state, currenciesHistory: []) =>
            (state.currenciesHistory = currenciesHistory),
        cleanCurrenciesHistory: (state) => (state.currenciesHistory = []),
    },
    actions: {
        setCurrenciesHistory: ({ commit }, currenciesHistory: []) => {
            commit('setCurrenciesHistory', currenciesHistory);
        },
        cleanCurrenciesHistory: ({ commit }) => {
            commit('cleanCurrenciesHistory');
        },
    },
    // namespaced: true,
};

export default amountModule;
