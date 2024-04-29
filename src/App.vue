<template>
    <div class="app">
        <component :is="currentComponent">
            <router-view />
        </component>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import currencyLayout from '@/layouts/currencyLayout.vue';
import defaultLayout from '@/layouts/defaultLayout.vue';
import { computed } from 'vue';

const components: { [key: string]: any } = {
    currencyLayout,
    defaultLayout,
};

const store = useStore();
const route = useRoute();

const currentComponent = computed(() => {
    return components[route.meta.layout as string];
});

const addConvertListItemToHistoryArray = (convertListItem: string): void => {
    store.commit('convert/addConvertListItemToHistoryArray', convertListItem);
};

const fetchCurrenciesHistory = () => {
    store.dispatch('convert/fetchCurrenciesHistory');
};

const initExchangeHistory = (): void => {
    const exchangeHistory: any = fetchCurrenciesHistory();

    const exchangeHistoryArray: string = exchangeHistory;
    addConvertListItemToHistoryArray(exchangeHistoryArray);
};

onMounted(() => {
    initExchangeHistory();
});
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Blinker', sans-serif;
    font-family: 'Roboto', sans-serif;
}
</style>
