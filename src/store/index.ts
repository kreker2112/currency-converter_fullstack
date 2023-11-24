import { createStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import amountModule, { AmountState } from './convertModule';

export const key: InjectionKey<Store<AmountState>> = Symbol();

const store = createStore({
    modules: {
        convert: amountModule,
    },
});

export default store;
