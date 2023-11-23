<template>
    <header class="header__container">
        <h1 class="header__title">
            Добро пожаловать в личный кабинет предпринимателя! Тут можно
            конвертировать валюту, хранить данные о поступлениях денежных
            средств, расчет дохода за период, расчет суммы налогов и
            формирование бюджетных платежей
        </h1>
    </header>
</template>

<script>
export default {
    name: 'MainPage',
}
</script>

<style scoped>
.header__container {
    position: absolute;
    right: 350px;
}

.header__title {
    font-size: 1.5rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;
    line-height: 3em;
}
</style>
