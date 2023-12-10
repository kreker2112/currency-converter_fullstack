<template>
    <div class="currencies__list" ref="currenciesList">
        <fieldset class="fieldset__container">
            <legend for="currency-select" class="currencies-legend__header">
                Выберите, пожалуйста, валюту для конвертации
            </legend>

            <div class="selected-bank">
                <strong>Выбран банк:</strong> {{ getSelectedBank }}
            </div>

            <div class="amount__sum">
                <strong>Сумма для обмена:</strong> {{ amount }}
            </div>

            <div class="currency currency-select">
                <select
                    ref="currencySelect"
                    id="currency-select"
                    class="currency currency-select__list"
                    name="currency"
                    @change="findSelectedCurrency"
                >
                    <option
                        class="currency currency-select__option_USD"
                        value="USD"
                    >
                        USD (Доллар США)
                    </option>
                    <option
                        class="currency currency-select__option_EUR"
                        value="EUR"
                    >
                        EUR (Евро)
                    </option>
                </select>
            </div>

            <div class="currencies__container">
                <div class="currency__item">
                    <input
                        id="rateBuy"
                        type="radio"
                        class="option-input radio"
                        name="convert"
                        value="rateBuy"
                        checked
                        @click="saveRadioInputValue"
                    />
                    <label class="currency-label" for="convertUSDtoUAH"
                        >UAH to {{ optionInput }}</label
                    >
                </div>

                <div class="currency__item">
                    <input
                        id="rateSell"
                        type="radio"
                        class="option-input radio"
                        name="convert"
                        value="rateSell"
                        @click="saveRadioInputValue"
                    />
                    <label class="currency-label" for="convertUAHtoUSD"
                        >{{ optionInput }} to UAH</label
                    >
                </div>
            </div>
            <div class="buttons__contaier">
                <ButtonComponent
                    button-style="currencies-list"
                    @click.prevent="calculate"
                >
                    Посчитать
                </ButtonComponent>
                <ButtonComponent
                    button-style="currencies-list"
                    @click.prevent="cancelOperation"
                >
                    Отменить операцию
                </ButtonComponent>
            </div>
        </fieldset>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const store = useStore();
const router = useRouter();

let amount: Ref<string> = ref('');

let optionInput: Ref<string> = ref('');

const currencySelect = ref(HTMLSelectElement);

const getAmount = store.getters['convert/getAmount'];

const getSelectedBank = store.getters['convert/getSelectedBank'].toUpperCase();

const setValueInput = (valueInput: string): void => {
    store.commit('convert/setValueInput', valueInput);
};
const setOptionInput = (optionInput: string): void => {
    store.commit('convert/setOptionInput', optionInput);
};
const findCurrencieCode = (): void => {
    store.commit('convert/findCurrencieCode');
};
const findCurrencieWithCurrencyCode = (): void => {
    store.commit('convert/findCurrencieWithCurrencyCode');
};
const calculateCurrency = (): void => {
    store.commit('convert/calculateCurrency');
};
const makeConvertListItem = (): void => {
    store.commit('convert/makeConvertListItem');
};
const addConvertListItemToHistoryArray = (): void => {
    store.commit('convert/addConvertListItemToHistoryArray');
};
const fetchCurrencies = (): void => {
    store.dispatch('convert/fetchCurrencies');
};

const calculate = (): void => {
    calculateCurrency();
    makeConvertListItem();
    addConvertListItemToHistoryArray();
    router.push({ name: 'resultPage' });
};

const saveOptionValue = (): void => {
    const select: HTMLSelectElement =
        currencySelect.value as unknown as HTMLSelectElement;
    const selectedOption: string = select.options[select.selectedIndex].value;
    localStorage.setItem('optionInput', selectedOption);
    setOptionInput(selectedOption);
};

const saveRadioInputValue = (): void => {
    const input = document.querySelector(
        'input[type="radio"]:checked',
    ) as HTMLInputElement;
    setValueInput(input.value);
};

const updateOptionInputOnMounted = (): void => {
    fetchCurrencies();
    saveOptionValue();
    findCurrencieCode();
    findCurrencieWithCurrencyCode();
};

const findSelectedCurrency = (): void => {
    saveOptionValue();
    findCurrencieCode();
    findCurrencieWithCurrencyCode();
    optionInput.value = localStorage.getItem('optionInput') || '';
};

const cancelOperation = (): void => {
    router.push({ name: 'converterPage' });
};

onMounted(() => {
    amount.value = getAmount;
    fetchCurrencies();
    updateOptionInputOnMounted();
    saveRadioInputValue();
    optionInput.value = localStorage.getItem('optionInput') || '';
});
</script>

<style lang="scss">
.currencies__list {
    margin: 0 auto;
    .fieldset__container {
        border: 2px solid #12c0b2;
        border-radius: 5px;
        padding: 20px;
        margin: 0 auto;
        width: 50vw;
        .currencies-legend__header {
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .selected-bank {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .amount__sum {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .currency.currency-select {
            margin: 10px;
            .currency-select__list {
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
        .currencies__container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-bottom: 10px;
            gap: 10px;
            .radio {
                border-radius: 50%;
                &::after {
                    border-radius: 50%;
                }
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

                &:hover {
                    background: #6ac054;
                }
                &:checked {
                    background: #6ac054;
                }
                &:checked::before {
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
                &:checked::after {
                    -webkit-animation: $radio-animation 0.65s;
                    -moz-animation: $radio-animation 0.65s;
                    animation: $radio-animation 0.65s;
                    background: #40e0d0;
                    content: '';
                    display: block;
                    position: relative;
                    z-index: 100;
                }
            }
            .currency-label {
                font-size: 20px;
                font-weight: bold;
                margin-left: 10px;
            }
        }
        .buttons__contaier {
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 10px;
        }
    }
}
</style>
~/src/assets/constants/currenciesMap
