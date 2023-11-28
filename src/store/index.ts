import { createStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import amountModule, { AmountState } from './convertModule';
import createPersistedState from 'vuex-persistedstate';

export const key: InjectionKey<Store<AmountState>> = Symbol();

const store = createStore({
    modules: {
        convert: amountModule,
    },
    plugins: [
        createPersistedState({
            key: 'currency', // измените на ваш префикс ключа
            paths: ['convert.cachedCurrencies'], // укажите свойство, которое нужно сохранить
        }),
    ],
});

export default store;
