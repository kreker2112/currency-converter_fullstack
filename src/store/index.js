import { createStore } from 'vuex'
import convertModule from './convertModule'

export default createStore({
    modules: {
        converter: convertModule,
    },
})
