<template>
    <div class="currencies__list" @submit.prevent>
        <fieldset class="fieldset__container">
            <legend for="currency-select" class="currencies-legend__header">
                Выберите, пожалуйста, валюту для конвертации
            </legend>

            <div class="amount__sum">
                <strong>Сумма для обмена:</strong> {{ getAmount }}
            </div>

            <div class="currency currency-select">
                <select
                    id="currency-select"
                    class="currency currency-select__list"
                    name="currency"
                    @change="findSelectedCurrency"
                >
                    <option value="USD">USD (Доллар США)</option>
                    <option value="EUR">EUR (Евро)</option>
                </select>
            </div>

            <div class="currencies__container">
                <div class=".currency currency__container">
                    <input
                        id="rateBuy"
                        type="radio"
                        class="option-input radio"
                        name="convert"
                        value="rateBuy"
                        checked
                        @click="
                            addRadioInputValueToComponentPropertyWithItsChanges
                        "
                    />
                    <label class="currency currency-label" for="convertUSDtoUAH"
                        >UAH to {{ optionInput }}</label
                    >
                </div>

                <div class=".currency currency__container">
                    <input
                        id="rateSell"
                        type="radio"
                        class="option-input radio"
                        name="convert"
                        value="rateSell"
                        @click="
                            addRadioInputValueToComponentPropertyWithItsChanges
                        "
                    />
                    <label class="currency currency-label" for="convertUAHtoUSD"
                        >{{ optionInput }} to UAH</label
                    >
                </div>
            </div>
            <div class="buttons buttons__contaier">
                <small-button
                    class="button calculate-button"
                    @click.prevent="calculate"
                >
                    Посчитать
                </small-button>
                <small-button
                    class="button calculate-button"
                    @click="cancelOperation"
                >
                    Отменить операцию
                </small-button>
            </div>
        </fieldset>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { mapActions, mapGetters, mapMutations } from 'vuex';

import { Amount, OptionInput } from '@/interfaces/currency';

export default defineComponent({
    name: 'CurrenciesList',

    data(): {
        amount: Amount;
        optionInput: OptionInput;
    } {
        return {
            amount: '' as Amount,
            optionInput: '' as OptionInput,
        };
    },

    computed: {
        ...mapGetters(['getCachedCurrencies', 'getOptionInput', 'getAmount']),
    },

    mounted(): void {
        this.amount = localStorage.amount as string;
        this.fetchCurrencies();
        this.updateOptionInputOnMounted();
        this.addRadioInputValueToComponentPropertyOnMounted();

        this.optionInput = localStorage.getItem('optionInput') || '';
    },

    methods: {
        ...mapMutations([
            'addRadioInputValueToComponentPropertyWithItsChanges',
            'addOptionValueToOptionInputAndLocalStorageWithItsChanges',
            'findCurrencieCodeWithCurrencyMapAndAddToState',
            'findCurrencieWithCurrencyCode',
            'calculateCurrency',
            'makeConvertListItem',
            'addConvertListItemToHistoryArray',
        ]),
        ...mapActions([
            'addConvertListItemToHistoryArrayAction',
            'fetchCurrencies',
            'addOptionValueToOptionInputAndLocalStorageOnMounted',
            'addRadioInputValueToComponentPropertyOnMounted',
        ]),

        updateOptionInputOnMounted(): void {
            this.fetchCurrencies();
            this.addOptionValueToOptionInputAndLocalStorageOnMounted();
            this.findCurrencieCodeWithCurrencyMapAndAddToState();
            this.findCurrencieWithCurrencyCode();
        },
        findSelectedCurrency(): void {
            this.addOptionValueToOptionInputAndLocalStorageWithItsChanges();
            this.findCurrencieCodeWithCurrencyMapAndAddToState();
            this.findCurrencieWithCurrencyCode();
            this.optionInput = localStorage.getItem('optionInput') || '';
        },

        calculate(): void {
            this.calculateCurrency();
            this.makeConvertListItem();
            this.addConvertListItemToHistoryArray();
            this.$router.push({ name: 'resultPage' });
        },

        cancelOperation(): void {
            this.$router.push({ name: 'converterPage' });
        },
    },
});
</script>

<style scoped>
.currencies__list {
    margin: 0 auto;
}
.fieldset__container {
    border: 2px solid #12c0b2;
    border-radius: 5px;
    padding: 20px;
    margin: 0 auto;
    width: 50vw;
}

.currencies__container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
    gap: 10px;
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

.currency.currency-select {
    margin: 10px;
}

.currency.currency-select__list {
    font-size: 20px;
    font-weight: bold;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid #12c0b2;
    outline: none;
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
~/src/assets/constants/currenciesMap
