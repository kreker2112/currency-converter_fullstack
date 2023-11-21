<template>
    <div class="container result__container">
        <h1 class="result__container-header">Результат</h1>
        <span>{{ result }}</span>
    </div>
    <div class="buttons buttons__contaier">
        <small-button class="button calculate-button" @click="cancelOperation">
            Вернуться в начало
        </small-button>
    </div>
</template>

<script>
export default {
    name: 'ResultPage',
    data() {
        return {
            result: null,
        }
    },
    mounted() {
        this.getResult()
    },
    methods: {
        getResult() {
            const result = Number(localStorage.getItem('result'))
            const currency =
                localStorage.getItem('radioInput') === 'rateBuy'
                    ? localStorage.getItem('optionInput')
                    : 'UAH'
            const roundedResult = result.toFixed(2) + ` ${currency}`
            return (this.result = roundedResult)
        },

        cancelOperation() {
            localStorage.removeItem('result')
            localStorage.removeItem('resultWithCurrency')
            localStorage.removeItem('optionInput')
            localStorage.removeItem('radioInput')
            localStorage.removeItem('amount')
            localStorage.removeItem('currencyCode')
            localStorage.removeItem('currencyObject')
            this.$router.push('/converter')
        },
    },
}
</script>

<style scoped>
.container.result__container {
    margin: 0 auto;
    width: 15vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #12c0b2;
    border-radius: 5px;
    padding: 20px;
}
.result__container-header {
    margin-bottom: 20px;
    font-size: 2em;
}

span {
    font-size: 1.5em;
    font-weight: 700;
}

.buttons.buttons__contaier {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
}
.button.calculate-button {
    margin-top: 20px;
    border-radius: 10px;
    width: 20em;
}
</style>
