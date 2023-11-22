const amountModule = {
    state: () => ({ amount: '', currenciesHistory: null }),
    getters: {
        getAmount: (state) => state.amount,
        getCurrenciesHistory: (state) => state.currenciesHistory,
    },
    mutations: {
        setAmount: (state, amount) => (state.amount = amount),
        setCurrenciesHistory: (state, currenciesHistory) =>
            (state.currenciesHistory = currenciesHistory),
    },
    actions: {
        setCurrenciesHistory: ({ commit }, currenciesHistory) => {
            commit('setCurrenciesHistory', currenciesHistory)
        },
    },
    // namespaced: true,
}

export default amountModule
