<template>
    <div>
        <form class="input-form" @submit.prevent>
            <h4>Конвертер валют</h4>
            <CurrencyInput v-model="amount" />
            <ButtonForConvert @click="$router.push('/currencies')"
                >Выберите валюту</ButtonForConvert
            >
        </form>
    </div>
</template>

<script>
export default {
    name: 'InputForm',
    components: {},
    data() {
        return {
            amount: '',
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
