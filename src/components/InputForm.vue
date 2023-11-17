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

<script>
import Notiflix from 'notiflix'
import { mapMutations } from 'vuex'

export default {
    name: 'InputForm',
    data() {
        return {
            amount: '',
        }
    },
    mounted() {
        // Получение данных из localStorage:
        this.amount = localStorage.amount
    },

    methods: {
        ...mapMutations({ setAmount: 'convert/setAmount' }),
        accept() {
            this.amount === undefined || this.amount === ''
                ? Notiflix.Notify.failure('Введите сумму!')
                : this.convert()
        },
        convert() {
            this.setAmount(this.amount)
            this.$router.push({
                name: 'currenciesList',
                // Передача параметра через query
                // query: { amount: this.amount },
            })
        },
        addAmountToLocalStorageOnInput() {
            localStorage.setItem('amount', this.amount)
        },
    },
}
</script>

<style scoped>
.input-form {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 15px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 15px;
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
