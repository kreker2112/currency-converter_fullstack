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
    name: 'IntroPage',
};
</script>

<style scoped>
.header__container {
    margin: 0 auto;
    width: 1480px;
    height: calc(100vh - 156px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.header__title {
    font-size: 1.5rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;
    line-height: 3em;
}
</style>
