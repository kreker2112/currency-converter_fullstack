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
import { ref } from 'vue';

const components: { [key: string]: any } = {
    currencyLayout,
    defaultLayout,
};

const store = useStore();
const route = useRoute();

const currentLayout = ref<string>(route.meta.layout as string);
console.log('currentLayout: ', currentLayout);
const currentComponent = ref(components[currentLayout.value]);
console.log('currentComponent: ', currentComponent);

const addConvertListItemToHistoryArray = (convertListItem: string): void => {
    store.commit('convert/addConvertListItemToHistoryArray', convertListItem);
};

const initExchangeHistory = (): void => {
    const exchangeHistory: string = JSON.parse(
        localStorage.getItem('convertListItemsArray') as string,
    );
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
