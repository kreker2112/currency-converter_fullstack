<template>
    <header class="header__container">
        <h1 class="header__title">
            Welcome to the entrepreneur's personal account! Here you can convert
            currency, store data on cash receipts funds, calculation of income
            for the period, calculation of the amount of taxes and formation of
            budget payments
        </h1>
    </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header__container {
    margin: 0 auto;
    width: 1480px;
    height: calc(100vh - 156px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .header__title {
        font-size: 1.5rem;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
            'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        text-align: center;
        line-height: 3em;
    }
}
</style>
