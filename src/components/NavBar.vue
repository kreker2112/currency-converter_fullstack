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
            >
                {{ button.name }}
            </ButtonComponent>
            <!-- Кнопка переключения темы -->
            <ButtonComponent button-style="nav-button" @click="toggleTheme">
                {{ currentTheme === 'light-theme' ? 'Dark' : 'Light' }} Theme
            </ButtonComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import { useStore } from 'vuex';
import ButtonComponent from '@/components/UI/ButtonComponent.vue';

const store = useStore();

// Текущая тема из Vuex
const currentTheme = ref(
    store.getters['theme/getCurrentTheme'] || 'light-theme',
);

const navButtons = ref([
    { id: uuidv4(), name: 'Currency converter', link: '/converter' },
    { id: uuidv4(), name: 'Receipts', link: '/funds' },
    { id: uuidv4(), name: 'Tax obligations', link: '/#' },
    { id: uuidv4(), name: 'Paying taxes', link: '/#' },
    { id: uuidv4(), name: 'About', link: '/#' },
]);

// Переключение темы
const toggleTheme = () => {
    const newTheme =
        currentTheme.value === 'light-theme' ? 'dark-theme' : 'light-theme';
    currentTheme.value = newTheme;
    document.body.className = newTheme;
    store.commit('theme/setTheme', newTheme);
};
</script>

<style scoped lang="scss">
.navbar {
    position: absolute;
    width: 100%;
    height: 80px;
    background-color: var(--primary-color);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 0 15px;
}

.navbar_title {
    font-size: 2rem;
    font-family: 'Lucida Sans', sans-serif;
    color: #fff;
    padding: 15px;
    height: 80px;
    cursor: pointer;
}

.navbar__btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
    padding-right: 20px;
}
</style>
