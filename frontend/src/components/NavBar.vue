<template>
    <div class="navbar">
        <div class="navbar_title" @click="$router.push('/')">
            Entrepreneur's Tax Cabinet
        </div>
        <div class="navbar_btns">
            <ButtonComponent
                button-style="nav-button"
                v-for="button in navButtons"
                :key="button.id"
                @click="$router.push(button.link)"
            >
                {{ button.name }}
            </ButtonComponent>

            <ThemeToggleButton />
        </div>
    </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import ButtonComponent from '@/components/UI/ButtonComponent.vue';

const navButtons = ref([
    { id: uuidv4(), name: 'Currency converter', link: '/converter' },
    { id: uuidv4(), name: 'Receipts', link: '/receipts' },
    { id: uuidv4(), name: 'Tax obligations', link: '/obligations' },
    { id: uuidv4(), name: 'Paying taxes', link: '/taxes' },
    { id: uuidv4(), name: 'About', link: '/#' },
]);
</script>

<style scoped lang="scss">
.navbar {
    position: absolute;
    width: 100%;
    height: 80px;
    background-image: linear-gradient(
        var(--secondary-color),
        var(--primary-color)
    );
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 0 15px;

    &_title {
        font-size: 2rem;
        font-family: 'Montserrat';
        color: #fff;
        padding: 15px;
        cursor: pointer;
    }

    &_btns {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 15px;
        padding-right: 20px;
    }
}
</style>
