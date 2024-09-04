<template>
    <div :class="['app', currentTheme]">
        <Navbar />
        <component :is="currentComponent">
            <router-view />
        </component>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import currencyLayout from '@/layouts/currencyLayout.vue';
import defaultLayout from '@/layouts/defaultLayout.vue';
import fundingsLayout from '@/layouts/fundingsLayout.vue';
import Navbar from '@/components/NavBar.vue';

const components: { [key: string]: any } = {
    currencyLayout,
    defaultLayout,
    fundingsLayout,
};

const store = useStore();
const route = useRoute();

// Получаем текущую тему из Vuex
const currentTheme = ref('light-theme');

onMounted(() => {
    currentTheme.value =
        store.getters['theme/getCurrentTheme'] || 'light-theme';
    document.body.classList.add(currentTheme.value);
});

// Выбор текущего компонента для отображения
const currentComponent = computed(() => {
    return components[route.meta.layout as string];
});

// Инициализация истории конверсий
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

.app {
    transition:
        background-color 0.3s ease,
        color 0.3s ease;
}
</style>
