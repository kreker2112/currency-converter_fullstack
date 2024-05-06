<template>
    <div>
        <header class="funds__container">
            <h1 class="funds__title">
                Data on cash receipts will be displayed here.
            </h1>
        </header>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.funds__container {
    margin: 0 auto;
    width: 1480px;
    height: calc(100vh - 156px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .funds__title {
        font-size: 1.5rem;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
            'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        text-align: center;
        line-height: 3em;
    }
}
</style>
