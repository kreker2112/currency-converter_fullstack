<template>
    <div class="navbar">
        <div class="navbar_title" @click="$router.push('/')">
            Entrepreneur's personal account
        </div>
        <div class="navbar__btns">
            <ButtonComponent
                button-style="nav-button"
                v-for="button in navButtons"
                :key="button.id"
                @click="$router.push(button.link)"
                >{{ button.name }}</ButtonComponent
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';

const navButtons = ref([
    { id: uuidv4(), name: 'Конвертер валют', link: '/converter' },
    { id: uuidv4(), name: 'Поступления', link: '/funds' },
    { id: uuidv4(), name: 'Налоговые обязанности', link: '/#' },
    { id: uuidv4(), name: 'Уплата налогов', link: '/#' },
    { id: uuidv4(), name: 'О сайте', link: '/#' },
]);
</script>

<style scoped lang="scss">
.navbar {
    position: absolute;
    width: 100%;
    height: 80px;
    background-color: #12c0b2;
    box-shadow: 2px 2px 4px #a79e84bd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 0 15px;
    cursor: pointer;
    .navbar_title {
        font-size: 2rem;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
            'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        color: #fff;
        padding: 15px;
        height: 80px;
    }
    .navbar__btns {
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 15px;
        padding-right: 20px;
    }
}
</style>
