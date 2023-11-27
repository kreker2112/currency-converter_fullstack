<template>
    <div class="currencies__list" @submit.prevent>
        <fieldset class="fieldset__container">
            <legend for="currency-select" class="currencies-legend__header">
                Выберите, пожалуйста, валюту для конвертации
            </legend>

            <div class="amount__sum">
                <strong>Сумма для обмена:</strong> {{ amount }}
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
                        @click="addRadioInputValueToLocalStorage"
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
                        @click="addRadioInputValueToLocalStorage"
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

import axios from 'axios';

import { currenciesMap } from '@/assets/constants/currenciesMap';

import { keysToRemove } from '@/assets/constants/keysToRemove';

import { mapActions } from 'vuex';

import { CurrencyObject, Amount, OptionInput } from '@/interfaces/currency';

export default defineComponent({
    name: 'CurrenciesList',

    data(): {
        amount: Amount;
        optionInput: OptionInput;
        currencyObject: CurrencyObject;
    } {
        return {
            amount: '' as Amount,
            optionInput: '' as OptionInput,
            currencyObject: {} as CurrencyObject,
        };
    },

    mounted(): void {
        this.amount = localStorage.amount as string;
        this.fetchCurrencies();
        this.addOptionInputOnMounted();
        this.addRadioInputOnMounted();
        this.optionInput = localStorage.getItem('optionInput') || '';
    },

    methods: {
        ...mapActions(['setCurrenciesHistory']),
        // Получение данных из API банка Монобанк и запись их в localStorage:
        async fetchCurrencies(): Promise<void> {
            try {
                const response = await axios.get(
                    'https://api.monobank.ua/bank/currency',
                );
                const currencies: CurrencyObject = response.data;
                console.log(typeof currencies);
                localStorage.setItem('currencies', JSON.stringify(currencies));
            } catch (error: any) {
                error.response.status === 429
                    ? this.handleCurrencies()
                    : console.error(error);
            }
        },
        // Добавление значения option в localStorage при его изменении:
        addOptionValueToLocalStorage(): void {
            const select = document.getElementById(
                'currency-select',
            ) as HTMLSelectElement;
            const selectedOption: string =
                select.options[select.selectedIndex].value;
            localStorage.setItem('optionInput', selectedOption);
        },
        // Добавление значения optionInput в localStorage при монтировании компонента:
        addOptionInputOnMounted(): void {
            const select = document.getElementById(
                'currency-select',
            ) as HTMLSelectElement;
            const selectedOption: string =
                select.options[select.selectedIndex].value;
            localStorage.optionInput === undefined
                ? localStorage.setItem('optionInput', selectedOption)
                : this.addOptionValueToLocalStorage();
            this.findCurrencieCodeWithCurrencyMapAndAddToLocalStorage();
            this.findCurrencieWithCurrencyCode();
        },
        // Добавление значения radioInput в localStorage:
        addRadioInputValueToLocalStorage(): void {
            const input = document.querySelector(
                'input[type="radio"]:checked',
            ) as HTMLInputElement;
            localStorage.setItem('radioInput', input.value);
        },
        // Получение данных инпута из localStorage:
        getInputFromLocalStorage(): void {
            const radioInput = localStorage.radioInput;
            radioInput === 'rateBuy'
                ? ((
                      document.getElementById('rateBuy') as HTMLInputElement
                  ).checked = true)
                : ((
                      document.getElementById('rateSell') as HTMLInputElement
                  ).checked = true);
        },
        // Добавление значения radioInput в localStorage при монтировании компонента:
        addRadioInputOnMounted(): void {
            const input = document.querySelector(
                'input[type="radio"]:checked',
            ) as HTMLInputElement;
            localStorage.input === undefined
                ? localStorage.setItem('radioInput', input.value)
                : this.getInputFromLocalStorage();
        },
        // Получение данных currencies из localStorage:

        handleCurrencies(): CurrencyObject[] {
            const cachedCurrencies: CurrencyObject[] = JSON.parse(
                localStorage.getItem('currencies') || '[]',
            );
            console.log(typeof cachedCurrencies);
            return cachedCurrencies;
        },
        // Поиск валюты в currenciesMap по инпуту и запись кода валюты в localStorage:
        findCurrencieCodeWithCurrencyMapAndAddToLocalStorage(): void {
            const input: string = localStorage.optionInput;
            const currencyCode = Object.keys(currenciesMap).find(
                (key: string) => currenciesMap[parseInt(key)] === input,
            );
            localStorage.setItem('currencyCode', currencyCode || '');
        },
        // Поиск объекта валюты в респонсе API банка Монобанк по коду и запись в localStorage:
        findCurrencieWithCurrencyCode(): void {
            const currencies: CurrencyObject[] = this.handleCurrencies();
            const currencyCode = Number(localStorage.currencyCode);
            currencies.find((item: any) => {
                if (
                    item.currencyCodeA === currencyCode &&
                    item.currencyCodeB === 980
                ) {
                    localStorage.setItem(
                        'currencyObject',
                        JSON.stringify(item),
                    );
                }
            });
        },
        findSelectedCurrency(): void {
            this.addOptionValueToLocalStorage();
            this.findCurrencieCodeWithCurrencyMapAndAddToLocalStorage();
            this.findCurrencieWithCurrencyCode();
            this.optionInput = localStorage.getItem('optionInput') || '';
        },
        // Посчитать конвертацию согласно выбранным параметрам валюты и типа операции:
        calculate(): void {
            const currencyObject = JSON.parse(
                localStorage.getItem('currencyObject') || '{}',
            );
            const amount = localStorage.amount;
            const radioInput = localStorage.radioInput;
            const rateBuy = currencyObject.rateBuy;
            const rateSell = currencyObject.rateSell;
            const rate = radioInput === 'rateBuy' ? rateBuy : rateSell;
            const result =
                radioInput === 'rateBuy' ? amount / rate : amount * rate;
            localStorage.setItem('result', result.toFixed(2));
            this.makeConvertListItem();
            this.$router.push({ name: 'resultPage' });
        },
        // Создание строки для списка конвертаций и запись ее в localStorage:
        makeConvertListItem(): void {
            const amount: string = localStorage.amount;
            const currency: string = localStorage.optionInput;
            const currencyFrom: string =
                localStorage.radioInput === 'rateBuy' ? 'UAH' : currency;
            const currencyTo: string =
                localStorage.radioInput === 'rateBuy' ? currency : 'UAH';
            const result: number = Number(localStorage.result);
            const item: string = `${amount} ${currencyFrom} = ${result} ${currencyTo}`;
            localStorage.setItem('convertListItem', item);
            this.addConvertListItemToHistoryArray(item);
        },

        addConvertListItemToHistoryArray(item: string): void {
            const convertListItemsArray: string[] =
                JSON.parse(
                    localStorage.getItem('convertListItemsArray') || '[]',
                ) || [];

            convertListItemsArray.push(item);
            this.setCurrenciesHistory(convertListItemsArray);
            localStorage.setItem(
                'convertListItemsArray',
                JSON.stringify(convertListItemsArray),
            );
        },

        // Отмена операции с очисткой input и amount в localStorage и переход на страницу конвертера:
        cancelOperation(): void {
            keysToRemove.forEach((key) => localStorage.removeItem(key));
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
