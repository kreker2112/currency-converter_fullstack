<template>
    <div class="app">
        <component :is="currentLayout">
            <router-view />
        </component>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import currencyLayout from '@/layouts/currencyLayout.vue';
import defaultLayout from '@/layouts/defaultLayout.vue';
import { mapMutations } from 'vuex';
export default defineComponent({
    name: 'App',
    components: {
        currencyLayout,
        defaultLayout,
    },
    computed: {
        currentLayout(): string {
            return (this.$route.meta as any).layout;
        },
    },

    mounted(): void {
        this.initExchangeHistory();
        this.initCleanHistory();
    },
    methods: {
        ...mapMutations([
            'addConvertListItemToHistoryArray',
            'cleanCurrenciesHistory',
        ]),
        initExchangeHistory(): void {
            const exchangeHistory: string = JSON.parse(
                localStorage.getItem('convertListItemsArray') || '[]',
            );
            const exchangeHistoryArray: string = exchangeHistory;
            this.addConvertListItemToHistoryArray(exchangeHistoryArray);
        },
        initCleanHistory(): void {
            const exchangeHistory: string = JSON.parse(
                localStorage.getItem('convertListItemsArray') || '[]',
            );
            if (exchangeHistory) {
                this.cleanCurrenciesHistory();
            }
        },
    },
});
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
