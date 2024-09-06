<template>
    <div class="entering-funds__container">
        <header class="entering-funds__header">
            <h1 class="entering-funds__title">Income data</h1>
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
            </div>
        </header>

        <div class="entering-funds__quarters">
            <div
                v-for="(quarter, index) in receiptsByQuarter"
                :key="index"
                class="entering-funds__quarter"
            >
                <h2 class="entering-funds__quarter-title">
                    Quarter {{ index + 1 }}
                </h2>
                <ul class="entering-funds__list">
                    <li
                        v-for="receipt in quarter"
                        :key="receipt.date"
                        class="entering-funds__list-item"
                    >
                        {{ new Date(receipt.date).toLocaleDateString() }}:
                        {{ receipt.amount }} {{ receipt.currency }} -
                        {{ receipt.uahAmount }} UAH
                    </li>
                </ul>
            </div>
        </div>

        <!-- Модальное окно -->
        <ModalReceipt v-if="showModal" @close="closeModal" />

        <!-- Кнопка в правом нижнем углу -->
        <ButtonComponent
            button-style="add-funds-button"
            @click="openModal"
            class="floating-button"
        >
            Add receipts
        </ButtonComponent>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import ModalReceipt from '@/components/ModalReceipt.vue';
import ButtonComponent from '@/components/UI/ButtonComponent.vue';

const store = useStore();

const showModal = ref(false);
const selectedYear = ref(new Date().getFullYear());
const availableYears = [2021, 2022, 2023, 2024];
const receiptsByQuarter = computed(() => {
    const receipts = store.getters['receipts/receiptsByQuarter'];
    console.log('Receipts by quarter:', receipts); // Отладочный вывод
    return receipts;
});

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const filterByYear = () => {
    store.commit('receipts/setFilterYear', selectedYear.value);
    console.log('Filtered by year:', selectedYear.value); // Отладочный вывод
};
</script>

<style scoped lang="scss">
.entering-funds__container {
    margin: 0 auto;
    max-width: 100vw;
    height: calc(100vh - 156px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    position: relative;
}

.entering-funds__header {
    position: absolute;
    top: 3vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    padding: 10px;
}

.entering-funds__title {
    font-size: 2rem;
    color: var(--primary-color);
    font-family: 'Montserrat';
    margin-bottom: 10px;
}

.entering-funds__controls {
    display: flex;
    justify-content: center;
    align-items: center;
}

.entering-funds__select {
    color: var(--input-color);
    background-color: var(--input-background-color);
    width: 100px;
    padding: 10px;
    font-size: 1.2rem;
    border: 2px solid var(--input-borders-color);
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    option {
        cursor: pointer;
    }
}

.entering-funds__quarters {
    position: absolute;
    top: 20vh;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    padding: 20px;
}

.entering-funds__quarter {
    width: calc(25% - 20px);
    background-color: var(--background-color);
    border-radius: 10px;
    padding: 10px;
}

.entering-funds__quarter-title {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 10px;
    text-align: center;
}

.entering-funds__list {
    list-style: none;
    padding: 0;
    text-align: center;
}

.entering-funds__list-item {
    display: inline-block;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    background-color: var(--input-background-color);
    box-shadow: 2px 2px 5px var(--box-shadow-color);
}

.floating-button {
    position: absolute;
    width: 200px;
    bottom: 40px;
    right: 40px;
    background-color: var(--primary-color);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.floating-button:hover {
    background-color: var(--secondary-color);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>
