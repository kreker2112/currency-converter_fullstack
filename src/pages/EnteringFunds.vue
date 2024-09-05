<template>
    <div class="entering-funds__container">
        <header class="entering-funds__header">
            <h1 class="entering-funds__title">Data on cash receipts</h1>
        </header>

        <div class="entering-funds__controls">
            <select
                v-model="selectedYear"
                class="entering-funds__select"
                @change="filterByYear"
            >
                <option
                    v-for="year in availableYears"
                    :key="year"
                    :value="year"
                >
                    {{ year }}
                </option>
            </select>
            <ButtonComponent button-style="button" @click="openModal">
                Добавить поступление
            </ButtonComponent>
        </div>

        <div class="entering-funds__quarters">
            <div
                v-for="(quarter, index) in receiptsByQuarter"
                :key="index"
                class="entering-funds__quarter"
            >
                <h2 class="entering-funds__quarter-title">
                    Квартал {{ index + 1 }}
                </h2>
                <ul class="entering-funds__list">
                    <li
                        v-for="receipt in quarter"
                        :key="receipt.date"
                        class="entering-funds__list-item"
                    >
                        {{ receipt.date }}: {{ receipt.amount }}
                        {{ receipt.currency }} - {{ receipt.uahAmount }} UAH
                    </li>
                </ul>
            </div>
        </div>

        <ModalReceipt v-if="showModal" @close="closeModal" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import ModalReceipt from '@/components/ModalReceipt.vue';
import ButtonComponent from '@/components/UI/ButtonComponent.vue';

const store = useStore();

const showModal = ref(false);
const selectedYear = ref(new Date().getFullYear());
const availableYears = [2021, 2022, 2023, 2024];
const receiptsByQuarter = store.getters['receipts/receiptsByQuarter'];

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const filterByYear = () => {
    store.commit('receipts/setFilterYear', selectedYear.value);
};
</script>

<style scoped lang="scss">
.entering-funds__container {
    margin: 0 auto;
    width: 1480px;
    height: calc(100vh - 156px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
}

.entering-funds__header {
    text-align: center;
    margin-bottom: 20px;
}

.entering-funds__title {
    font-size: 2rem;
    color: var(--primary-color);
    font-family: 'Lucida Sans', sans-serif;
}

.entering-funds__controls {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
}

.entering-funds__select {
    width: 100px;
    padding: 10px;
    font-size: 1.2rem;
    border: 2px solid var(--input-borders-color);
    border-radius: 5px;
    outline: none;
}

.entering-funds__quarters {
    margin-top: 20px;
}

.entering-funds__quarter {
    margin-bottom: 20px;
}

.entering-funds__quarter-title {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 10px;
}

.entering-funds__list {
    list-style: none;
    padding: 0;
}

.entering-funds__list-item {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 2px 2px 5px var(--box-shadow-color);
}
</style>
