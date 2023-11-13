<template>
    <header class="header__container">
        <div class="pages__container">
            <h1 class="header__title">
                Добро пожаловать в личный кабинет предпринимателя! Тут можно
                конвертировать валюту, хранить данные о поступлениях денежных
                средств, расчет дохода за период, расчет суммы налогов и
                формирование бюджетных платежей
            </h1>
        </div>
    </header>
</template>

<script>
export default {
    name: 'MainPage',
}
</script>

<style scoped>
.header__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
}

.pages__container {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

.header__title {
    font-size: 2rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;
    line-height: 3em;
}
</style>
