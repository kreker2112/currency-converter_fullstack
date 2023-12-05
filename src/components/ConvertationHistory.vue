<template>
    <div class="convertation-history container">
        <h1 class="convertation-history header">История конвертаций:</h1>
        <ButtonComponent button-style="cleanup-history" @click="clearHistory"
            >Очистить историю</ButtonComponent
        >
        <transition-group name="convertation-history list"
            ><div
                v-for="item in getCurrenciesHistory"
                :key="item"
                class="convertation-history list-item"
            >
                {{ item }}
            </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const getCurrenciesHistory = computed(
    () => store.getters['convert/getCurrenciesHistory'],
);
const addConvertListItemToHistoryArray = (
    convertListItemsArray: string[],
): void => {
    store.commit(
        'convert/addConvertListItemToHistoryArray',
        convertListItemsArray,
    );
};
const cleanCurrenciesHistory = (): void => {
    store.commit('convert/cleanCurrenciesHistory');
};

onMounted(() => {
    const historyInLocalStorage = localStorage.getItem('convertListItemsArray');
    if (historyInLocalStorage) {
        const convertListItemsArray = JSON.parse(historyInLocalStorage);
        if (getCurrenciesHistory.value.length === 0) {
            addConvertListItemToHistoryArray(convertListItemsArray);
        }
    }
});

const clearHistory = (): void => {
    localStorage.removeItem('convertListItemsArray');
    localStorage.removeItem('convertListItem');
    cleanCurrenciesHistory();
};
</script>

<style scoped lang="scss">
.convertation-history.container {
    top: 80px;
    right: 0;
    padding: 15px;
    width: 350px;
    height: calc(100vh - 156px);
    border-left: 4px solid #12c0b2;
    overflow-y: scroll;

    .header {
        margin-bottom: 15px;
        font-size: 24px;
    }

    .list {
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style: none;
    }
    .list-item {
        text-align: center;
        padding: 15px;
        width: 100%;
        border: 2px solid #12c0b2;
        border-radius: 5px;

        &:not(:last-of-type) {
            margin-bottom: 10px;
        }
    }
    .list-enter-active,
    .list-leave-active {
        transition: all 1s;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
}
</style>
