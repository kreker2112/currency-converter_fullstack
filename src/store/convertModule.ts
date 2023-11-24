import { Module } from 'vuex';

export interface AmountState {
    amount: string;
    currenciesHistory: null | string;
}

const amountModule: Module<AmountState, any> = {
    state: () => ({ amount: '', currenciesHistory: null }),
    getters: {
        getAmount: (state) => state.amount,
        getCurrenciesHistory: (state) => state.currenciesHistory,
    },
    mutations: {
        setAmount: (state, amount: string) => (state.amount = amount),
        setCurrenciesHistory: (state, currenciesHistory: null) =>
            (state.currenciesHistory = currenciesHistory),
    },
    actions: {
        setCurrenciesHistory: ({ commit }, currenciesHistory: null) => {
            commit('setCurrenciesHistory', currenciesHistory);
        },
    },
    // namespaced: true,
};

export default amountModule;
