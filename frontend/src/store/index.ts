import { createStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import amountModule, { AmountState } from './convertModule';
import receiptsModule, { ReceiptsState } from './receiptsModule';

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
});

export default store;
