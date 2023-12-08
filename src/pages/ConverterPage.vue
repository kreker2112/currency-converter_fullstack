<template>
    <div class="converter-page">
        <div class="bank-select__container">
            <h2 class="bank-select__header">Выберите, пожалуйста, банк:</h2>
            <select
                ref="bankSelect"
                id="bank-select"
                class="bank-select__list"
                name="bank"
                v-model="selectedBank"
                @change="setSelectedBank"
            >
                <option
                    disabled
                    value=""
                    selected
                    class="select-option__disabled"
                >
                    Select a bank
                </option>
                <option value="monobank">Monobank</option>
                <option value="nbu">NBU</option>
            </select>
        </div>
        <div class="input-form__container">
            <InputForm />
        </div>
    </div>
</template>

<script setup lang="ts">
import InputForm from '@/components/InputForm.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const selectedBank = ref('');
const setSelectedBank = () => {
    store.commit('convert/setSelectedBank', selectedBank.value);
};
// const fetchCurrencies = () => {
//     store.dispatch('convert/fetchCurrencies');
// };
// const updateSelectedBank = () => {
//     setSelectedBank();
//     fetchCurrencies();
// };
</script>

<style scoped lang="scss">
.converter-page {
    margin: 0 auto;
}
.input-form__container {
    margin: 0 auto;
}

.bank-select__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    .bank-select__header {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .bank-select__list {
        width: fit-content;
        font-size: 20px;
        font-weight: bold;
        padding: 5px;
        border-radius: 5px;
        border: 2px solid #12c0b2;
        outline: none;
        text-align: center;
    }
}
</style>
