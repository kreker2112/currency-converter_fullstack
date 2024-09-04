<template>
    <div class="modal-overlay" v-if="showModal">
        <div class="modal-content">
            <h2 class="modal-title">Добавить поступление</h2>
            <input
                type="number"
                v-model="amount"
                placeholder="Введите сумму"
                class="modal-input"
            />
            <select
                v-model="currency"
                @change="fetchCurrencyRate"
                class="modal-select"
            >
                <option value="" disabled>Выберите валюту</option>
                <option value="USD">USD (U.S. dollar)</option>
                <option value="EUR">EUR (Euro)</option>
            </select>
            <p class="modal-rate">Курс: {{ exchangeRate }}</p>
            <div class="modal-buttons">
                <ButtonComponent
                    button-style="nav-button"
                    @click="acceptReceipt"
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
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const emit = defineEmits(['close']);

const store = useStore();

const showModal = ref(true);
const amount = ref('');
const currency = ref('');
const exchangeRate = ref(0);

const fetchCurrencyRate = async () => {
    const url = process.env.VUE_APP_NBU_URL;
    try {
        const response = await axios.get(url);
        const rates = response.data;
        const selectedRate = rates.find(
            (rate: any) => rate.cc === currency.value,
        );
        exchangeRate.value = selectedRate.rate;
    } catch (error) {
        console.error('Ошибка получения курса валют:', error);
    }
};

const acceptReceipt = () => {
    const uahAmount = parseFloat(amount.value) * exchangeRate.value;
    const receipt = {
        amount: amount.value,
        currency: currency.value,
        uahAmount,
        date: new Date(),
    };
    store.commit('receipts/addReceipt', receipt);
    closeModal();
};

const closeModal = () => {
    emit('close');
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
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
    border: 2px solid #12c0b2;
}

.modal-title {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #12c0b2;
    font-family: 'Lucida Sans', sans-serif;
}

.modal-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 2px solid #12c0b2;
    border-radius: 5px;
    font-size: 1.2rem;
    outline: none;
}

.modal-select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 2px solid #12c0b2;
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
}

button {
    width: 45%;
}
</style>
