<template>
    <div class="result-page">
        <div class="container result__container">
            <h1 class="result__container-header">Результат</h1>
            <span>{{ result }}</span>
        </div>
        <div class="buttons buttons__contaier">
            <small-button
                class="button calculate-button"
                @click="cancelOperation"
            >
                Вернуться в начало
            </small-button>
        </div>
    </div>
</template>

<script>
import { keysToRemove } from '@/assets/constants/keysToRemove'
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
            const resultWithCurrency = result + ` ${currency}`
            return (this.result = resultWithCurrency)
        },

        cancelOperation() {
            keysToRemove.forEach((key) => localStorage.removeItem(key))
            this.$router.push('/converter')
        },
    },
}
</script>

<style scoped>
.result-page {
    margin: 0 auto;
    height: 100%;
}
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
