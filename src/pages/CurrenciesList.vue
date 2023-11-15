<template>
    <div class="currencies__form">
        <fieldset class="fieldset__container">
            <legend class="currencies-legend__header">
                Выберите, пожалуйста, валютную пару для конвертации
            </legend>

            <div class="amount__sum">
                <strong>Сумма для обмена:</strong> {{ amount }}
                <!-- Получение данных из query: -->
                <!-- <strong>Сумма для обмена:</strong> {{ $route.query.amount }} -->
            </div>

            <div class="currencies__container">
                <div class=".currency currency__container">
                    <input
                        id="convertUSDtoUAH"
                        type="radio"
                        class="option-input radio"
                        name="convert"
                        value="UAH"
                        checked
                        @click="addRadioInputValueToLocalStorage"
                    />
                    <label class="currency currency-label" for="convertUSDtoUAH"
                        >USD to UAH</label
                    >
                </div>

                <div class=".currency currency__container">
                    <input
                        id="convertUAHtoUSD"
                        type="radio"
                        class="option-input radio"
                        name="convert"
                        value="USD"
                        @click="addRadioInputValueToLocalStorage"
                    />
                    <label class="currency currency-label" for="convertUAHtoUSD"
                        >UAH to USD</label
                    >
                </div>
            </div>
            <div class="buttons buttons__contaier">
                <small-button
                    class="button calculate-button"
                    @click.prevent="fetchCurrencies"
                >
                    Посчитать
                </small-button>
                <small-button
                    class="button calculate-button"
                    @click="$router.push('/converter')"
                >
                    Отменить операцию
                </small-button>
            </div>
        </fieldset>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
axios.defaults.baseURL =
    'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
export default {
    name: 'CurrenciesList',
    data() {
        return { amount: '' }
    },
    computed: {
        ...mapGetters({ getAmount: 'convert/getAmount' }),
    },
    mounted() {
        this.amount = localStorage.amount
        this.getInputFromLocalStorage()
    },

    methods: {
        addRadioInputValueToLocalStorage() {
            const input = document.querySelector('input[type="radio"]:checked')
            console.log(input.value)

            localStorage.setItem('input', input.value)
        },
        async fetchCurrencies() {
            try {
                const response = await axios.get()
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        },
        addGetAmountToLocalStorageOnMount() {
            localStorage.setItem('amount', this.getAmount)
        },
        setAmountFromGetAmount() {
            this.amount = this.getAmount
        },
        getInputFromLocalStorage() {
            localStorage.input === 'UAH'
                ? (document.getElementById('convertUAHtoUSD').checked = true)
                : (document.getElementById('convertUSDtoUAH').checked = true)
        },
    },
}
</script>

<style scoped>
.fieldset__container {
    border: 2px solid #12c0b2;
    border-radius: 5px;
    padding: 20px;
    margin: 0 auto;
    width: 50vw;
}
.currencies__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
}
.currencies__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 10px;
    gap: 10px;
}

.currency.currency__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    margin-bottom: 10px;
}

.currency.currency-label {
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
}
.currencies-legend__header {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
}
.amount__sum {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
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

.option-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    position: relative;
    top: 13.33333px;
    right: 0;
    bottom: 0;
    left: 0;
    height: 40px;
    width: 40px;
    transition: all 0.15s ease-out 0s;
    background: #cbd1d8;
    border: none;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    margin-right: 0.5rem;
    outline: none;
    position: relative;
    z-index: 1000;
}
.option-input:hover {
    background: #6ac054;
}
.option-input:checked {
    background: #12c0b2;
}
.option-input:checked::before {
    width: 40px;
    height: 40px;
    display: flex;
    font-family: 'Font Awesome 5 Free';
    content: '\f00c';
    font-size: 25px;
    font-weight: 900;
    position: absolute;
    align-items: center;
    justify-content: center;
    color: #fff;
}
.option-input:checked::after {
    -webkit-animation: click-wave 0.65s;
    -moz-animation: click-wave 0.65s;
    animation: click-wave 0.65s;
    background: #40e0d0;
    content: '';
    display: block;
    position: relative;
    z-index: 100;
}
.option-input.radio {
    border-radius: 50%;
}
.option-input.radio::after {
    border-radius: 50%;
}

@keyframes click-wave {
    0% {
        height: 40px;
        width: 40px;
        opacity: 0.35;
        position: relative;
    }
    100% {
        height: 200px;
        width: 200px;
        margin-left: -80px;
        margin-top: -80px;
        opacity: 0;
    }
}
</style>
