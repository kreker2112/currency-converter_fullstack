<template>
    <div class="modal-overlay" v-if="showModal">
        <div class="modal-content">
            <h2 class="modal-title">Add receipt</h2>
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
                    @click="acceptReceipt"
                    :disabled="!isFormValid"
                >
                    Accept
                </ButtonComponent>
                <ButtonComponent button-style="nav-button" @click="closeModal">
                    Cancel
                </ButtonComponent>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import ButtonComponent from '@/components/UI/ButtonComponent.vue';

const emit = defineEmits(['close', 'receiptAdded']);
const store = useStore();

const showModal = ref(true);
const amount = ref('');
const currency = ref('');
const selectedDate = ref('');
const selectedUser = computed(() => store.getters['receipts/getSelectedUser']);
const exchangeRate = computed(() => store.getters['receipts/getExchangeRate']);

const isFormValid = computed(() => {
    return amount.value && currency.value && selectedDate.value;
});

const formatDateToYYYYMMDD = (date: string) => {
    return date.replace(/-/g, '');
};

const fetchCurrencyRate = () => {
    if (currency.value && selectedDate.value) {
        const formattedDate = formatDateToYYYYMMDD(selectedDate.value);
        store.dispatch('receipts/fetchCurrencyRate', {
            currency: currency.value,
            date: formattedDate,
        });
    }
};

const getQuarterFromMonth = (month: number): number => {
    return Math.floor(month / 3) + 1;
};

const acceptReceipt = async () => {
    if (!isFormValid.value) return;

    const receiptDate = new Date(selectedDate.value);
    const quarter = getQuarterFromMonth(receiptDate.getMonth());

    try {
        await store.dispatch('receipts/sendReceipt', {
            selectedUser: selectedUser.value,
            amount: amount.value,
            currency: currency.value,
            date: selectedDate.value,
            quarter: quarter,
        });
        emit('receiptAdded');
        closeModal();
        resetForm();
    } catch (error) {
        console.error('Error sending receipt:', error);
    }
};

const closeModal = () => {
    emit('close');
};

const resetForm = () => {
    amount.value = '';
    currency.value = '';
    selectedDate.value = '';
};
</script>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: var(--primary-color);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
    border: 2px solid var(--primary-color);

    .modal-title {
        font-size: 1.8rem;
        margin-bottom: 20px;
        color: var(--text-color);
        font-family: 'Lucida Sans', sans-serif;
    }

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
}
</style>
