<template>
    <div>
        <div class="input-form">
            <h4>Конвертер валют</h4>
            <CurrencyInput
                v-model="amount"
                @input="addAmountToLocalStorageOnInput"
            />
            <ButtonForConvert @click="accept">Выберите валюту</ButtonForConvert>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notiflix from 'notiflix';
import { mapMutations } from 'vuex';

export default defineComponent({
    name: 'InputForm',
    data() {
        return {
            amount: '' as string,
        };
    },
    mounted() {
        this.amount = localStorage.amount || '';
    },

    methods: {
        ...mapMutations({ setAmount: 'setAmount' }),
        accept(): void {
            this.amount === undefined || this.amount === ''
                ? Notiflix.Notify.failure('Введите сумму!')
                : this.convert();
        },
        convert(): void {
            this.setAmount(this.amount);
            this.$router.push({
                name: 'currenciesList',
            });
        },
        addAmountToLocalStorageOnInput(): void {
            localStorage.setItem('amount', this.amount);
        },
    },
});
</script>

<style scoped>
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
}

.input-form h4 {
    margin: 0;
    font-size: 20px;
    font-weight: 900;
    color: #070707;
}
</style>
