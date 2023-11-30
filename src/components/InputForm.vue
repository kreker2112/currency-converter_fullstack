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

<script lang="ts">
import { defineComponent } from 'vue';
import Notiflix from 'notiflix';
import { mapMutations } from 'vuex';
import { Amount } from '@/interfaces/currency';

export default defineComponent({
    name: 'InputForm',
    data(): {
        amount: Amount;
    } {
        return {
            amount: '',
        };
    },

    methods: {
        ...mapMutations({ setAmount: 'convert/setAmount' }),

        accept(): void {
            !this.amount
                ? Notiflix.Notify.failure('Введите сумму!')
                : this.convert();
        },
        convert(): void {
            this.setAmount(this.amount);
            this.$router.push({
                name: 'currenciesList',
            });
        },
        addAmountToState(): void {
            this.setAmount(this.amount);
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
