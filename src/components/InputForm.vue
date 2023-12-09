<template>
    <div>
        <div class="input-form">
            <h2>Конвертер валют</h2>
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
                        Choose a bank
                    </option>
                    <option value="monobank">Monobank</option>
                    <option value="nbu">NBU</option>
                </select>
            </div>
            <CurrencyInput v-model="amount" @input="addAmountToState" />
            <ButtonComponent button-style="button" @click.prevent="accept"
                >Выберите валюту</ButtonComponent
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import Notiflix from 'notiflix';
import { useStore } from 'vuex';
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const amount: Ref<string> = ref('');
const selectedBank = ref('');

const accept = (): void => {
    !amount.value || !selectedBank.value
        ? Notiflix.Notify.failure('Введите сумму и выберите банк!')
        : convert();
};

const convert = (): void => {
    store.commit('convert/setAmount', amount.value);
    router.push({
        name: 'currenciesList',
    });
};

const addAmountToState = (): void => {
    store.commit('convert/setAmount', amount.value);
};

const setSelectedBank = () => {
    store.commit('convert/setSelectedBank', selectedBank.value);
};
</script>

<style scoped lang="scss">
.input-form {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 15px;
    padding: 15px;
    width: 30vw;
    border: 2px solid #18aa66;
    box-shadow: -2px 2px 2px #a79e84bd;
    border-radius: 10px;

    h4 {
        margin: 0;
        font-size: 20px;
        font-weight: 900;
        color: #070707;
    }
    .bank-select__container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 15px;
        margin: 20px 0;
        .bank-select__header {
            font-size: 20px;
            font-weight: bold;
            margin: 10px 0 10px 0;
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
}
</style>
