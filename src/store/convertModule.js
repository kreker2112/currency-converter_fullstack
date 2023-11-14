const convertModule = {
    state: { amount: '' },
    getters: {
        getAmount: (state) => state.amount,
    },
    mutations: {
        setAmount: (state, amount) => (state.amount = amount),
    },
    actions: {},
}

export default convertModule
