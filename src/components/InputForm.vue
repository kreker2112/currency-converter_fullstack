<template>
    <div>
        <form class="input-form" @submit.prevent>
            <h4>Конвертер валют</h4>

            <CurrencyInput
                v-model="amount"
                v-focus
                type="number"
                placeholder="Введите сумму"
            />
            <ButtonForConvert>Выберите валюту</ButtonForConvert>
        </form>
    </div>
</template>

<script>
export default {
    name: 'InputForm',
    components: {},
    data() {
        return {
            amount: 0,
        }
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
    border-radius: 10px;
}
</style>
