<template>
    <div>
        <form class="input-form" @submit.prevent>
            <h4>Конвертер валют</h4>
            <CurrencyInput v-model="amount" />
            <ButtonForConvert @click="convert"
                >Выберите валюту</ButtonForConvert
            >
        </form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'InputForm',

    data() {
        return {
            amount: '',
        }
    },
    methods: {
        ...mapMutations({ setAmount: 'convert/setAmount' }),
        convert() {
            this.setAmount(this.amount)
            this.$router.push({
                name: 'currenciesList',
                // Передача параметра через query
                // query: { amount: this.amount },
            })
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
