<template>
    <Navbar />
    <div class="app">
        <router-view />
    </div>
    <ConvertationHistory />
    <FooterComponent />
</template>

<script>
import Navbar from '@/components/UI/NavBar.vue'
import ConvertationHistory from './components/UI/ConvertationHistory.vue'
import { mapMutations } from 'vuex'
export default {
    name: 'App',
    components: {
        Navbar,
        ConvertationHistory,
    },
    mounted() {
        this.initExchangeHistory()
    },
    methods: {
        ...mapMutations(['setCurrenciesHistory']),
        initExchangeHistory() {
            const exchangeHistory = JSON.parse(
                localStorage.getItem('convertListItemsArray'),
            )
            const exchangeHistoryArray = exchangeHistory
            console.log('exchangeHistoryArray', exchangeHistoryArray)
            this.setCurrenciesHistory(exchangeHistoryArray)
        },
    },
}
</script>

<style>
* {
    position: relative;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Blinker', sans-serif;
    font-family: 'Roboto', sans-serif;
}

.app {
    max-width: 1480px;
    height: calc(100vh - 80px);
    margin: 0 auto;
    padding: 25vh;
    /* padding-top: 20vh; */
}
</style>
