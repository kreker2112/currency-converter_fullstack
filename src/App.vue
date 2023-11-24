<template>
    <div class="app">
        <component :is="currentLayout">
            <router-view> </router-view>
        </component>
    </div>
</template>

<script>
import currencyLayout from '@/layouts/currencyLayout.vue';
import defaultLayout from '@/layouts/defaultLayout.vue';
import { mapMutations } from 'vuex';
export default {
    name: 'App',
    components: {
        currencyLayout,
        defaultLayout,
    },
    computed: {
        currentLayout() {
            console.log(this.$route.meta.layout);
            return this.$route.meta.layout;
        },
    },

    mounted() {
        this.initExchangeHistory();
    },
    methods: {
        ...mapMutations(['setCurrenciesHistory']),
        initExchangeHistory() {
            const exchangeHistory = JSON.parse(
                localStorage.getItem('convertListItemsArray'),
            );
            const exchangeHistoryArray = exchangeHistory;
            this.setCurrenciesHistory(exchangeHistoryArray);
        },
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Blinker', sans-serif;
    font-family: 'Roboto', sans-serif;
}
</style>
