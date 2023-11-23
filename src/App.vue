<template>
    <Navbar />
    <div class="app">
        <router-view />
        <ConvertationHistory v-if="shouldShow" />
    </div>

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
    computed: {
        shouldShow() {
            if (
                this.$route.path === '/converter' ||
                this.$route.path === '/converter/currencies' ||
                this.$route.path === '/converter/result'
            ) {
                return true
            }
            return false
        },
    },

    mounted() {
        this.initExchangeHistory()
        console.log(this.$route.path)
    },
    methods: {
        ...mapMutations(['setCurrenciesHistory']),
        initExchangeHistory() {
            const exchangeHistory = JSON.parse(
                localStorage.getItem('convertListItemsArray'),
            )
            const exchangeHistoryArray = exchangeHistory
            this.setCurrenciesHistory(exchangeHistoryArray)
        },
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Blinker', sans-serif;
    font-family: 'Roboto', sans-serif;
}

.app {
    position: absolute;
    top: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    width: 100%;
}
</style>
