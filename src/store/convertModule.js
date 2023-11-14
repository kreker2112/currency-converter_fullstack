const amountModule = {
    state: () => ({ amount: '' }),
    getters: {
        getAmount: (state) => state.amount,
    },
    mutations: {
        setAmount: (state, amount) => (state.amount = amount),
    },
    namespaced: true,
}

export default amountModule
