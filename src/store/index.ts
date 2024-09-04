import { createStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import amountModule, { AmountState } from './convertModule';
import receiptsModule, { ReceiptsState } from './receiptsModule'; // Импортируем модуль
import createPersistedState from 'vuex-persistedstate';

export interface RootState {
    amount: AmountState;
    receipts: ReceiptsState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

const store = createStore<RootState>({
    modules: {
        convert: amountModule,
        receipts: receiptsModule,
    },
    plugins: [
        createPersistedState({
            key: 'currency',
            paths: ['convert.cachedCurrencies', 'receipts.receipts'], // Добавляем сохранение состояния для receipts
        }),
    ],
});

export default store;
