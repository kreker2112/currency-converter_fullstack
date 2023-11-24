import { createStore } from 'vuex';
import amountModule from './convertModule';

export default createStore({
    modules: {
        convert: amountModule,
    },
});
