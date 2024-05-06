<template>
    <div class="convertation-history container">
        <h1 class="convertation-history header">Convertation history:</h1>
        <ButtonComponent button-style="cleanup-history" @click="clearHistory"
            >Cleanup history</ButtonComponent
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

const deleteCurrenciesHistory = () => {
    store.dispatch('convert/deleteCurrenciesHistory');
};

const fetchCurrenciesHistory = () => {
    store.dispatch('convert/fetchCurrenciesHistory');
};
const cleanCurrenciesHistory = (): void => {
    store.commit('convert/cleanCurrenciesHistory');
};

onMounted(() => {
    fetchCurrenciesHistory();
});

const clearHistory = (): void => {
    cleanCurrenciesHistory();
    deleteCurrenciesHistory();
};
</script>

<style scoped lang="scss">
.convertation-history.container {
    top: 80px;
    right: 0;
    padding: 15px;
    width: fit-content;
    height: calc(100vh - 156px);
    border-left: 4px solid #12c0b2;
    overflow-y: auto;
    transition: transform 0.3s ease-in-out;
    transform: translateX(0);

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
