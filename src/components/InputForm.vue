<template>
    <div>
        <div class="input-form">
            <h4>Конвертер валют</h4>
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

const accept = (): void => {
    !amount.value ? Notiflix.Notify.failure('Введите сумму!') : convert();
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
}
</style>
