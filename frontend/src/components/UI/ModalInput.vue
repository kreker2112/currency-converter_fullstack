<template>
    <div>
        <input
            type="number"
            v-model="amount"
            placeholder="Enter the amount"
            class="modal-input"
        />
        <select
            v-model="currency"
            @change="fetchCurrencyRate"
            class="modal-select"
        >
            <option value="" disabled>Choose currency</option>
            <option value="USD">USD (U.S. dollar)</option>
            <option value="EUR">EUR (Euro)</option>
        </select>
        <input
            type="date"
            v-model="selectedDate"
            @change="fetchCurrencyRate"
            class="modal-input"
        />
        <p class="modal-rate">Rate: {{ exchangeRate }}</p>

        <div class="modal-buttons">
            <ButtonComponent
                button-style="nav-button"
                @click="submitForm"
                :disabled="!isFormValid"
            >
                Accept
            </ButtonComponent>
            <ButtonComponent button-style="nav-button" @click="cancelForm">
                Cancel
            </ButtonComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const emit = defineEmits(['submit', 'cancel']);

const amount = ref('');
const currency = ref('');
const selectedDate = ref('');
const exchangeRate = computed(() => store.getters['receipts/getExchangeRate']);

const isFormValid = computed(() => {
    return amount.value && currency.value && selectedDate.value;
});

const fetchCurrencyRate = () => {
    if (currency.value && selectedDate.value) {
        const formattedDate = selectedDate.value.replace(/-/g, '');
        store.dispatch('receipts/fetchCurrencyRate', {
            currency: currency.value,
            date: formattedDate,
        });
    }
};

const getQuarterFromMonth = (month: number): number => {
    return Math.floor(month / 3) + 1;
};

const submitForm = () => {
    if (isFormValid.value) {
        const receiptDate = new Date(selectedDate.value);
        const quarter = getQuarterFromMonth(receiptDate.getMonth());

        emit('submit', {
            amount: amount.value,
            currency: currency.value,
            date: selectedDate.value,
            quarter,
        });
    }
};

const cancelForm = () => {
    emit('cancel');
};
</script>

<style scoped lang="scss">
.modal-input,
.modal-select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 2px solid var(--input-borders-color);
    border-radius: 5px;
    font-size: 1.2rem;
    outline: none;
}

.modal-rate {
    font-size: 1.2rem;
    margin-bottom: 15px;
}

.modal-buttons {
    display: flex;
    justify-content: space-between;

    button {
        width: 45%;
    }
}
</style>
