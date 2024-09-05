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

            <!-- Кнопка для переключения темы с иконками солнца и луны и всплывающей подсказкой -->
            <div class="theme-switch-container" @mouseenter="showTooltip">
                <button class="theme-button" @click="toggleTheme">
                    <img
                        v-if="!isDarkTheme"
                        src="@/assets/images/sun.svg"
                        alt="Light Theme"
                        class="theme-icon"
                    />
                    <img
                        v-else
                        src="@/assets/images/moon.svg"
                        alt="Dark Theme"
                        class="theme-icon"
                    />
                </button>
                <!-- Всплывающая подсказка -->
                <span class="theme-tooltip" v-if="isTooltipVisible">
                    {{ isDarkTheme ? 'Dark theme' : 'Light theme' }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import ButtonComponent from '@/components/UI/ButtonComponent.vue';

const store = useStore();

// Проверка текущей темы при запуске приложения
const currentTheme = ref(localStorage.getItem('theme') || 'light-theme');
const isDarkTheme = ref(currentTheme.value === 'dark-theme'); // Для переключателя

const navButtons = ref([
    { id: uuidv4(), name: 'Currency converter', link: '/converter' },
    { id: uuidv4(), name: 'Receipts', link: '/funds' },
    { id: uuidv4(), name: 'Tax obligations', link: '/#' },
    { id: uuidv4(), name: 'Paying taxes', link: '/#' },
    { id: uuidv4(), name: 'About', link: '/#' },
]);

// Для управления видимостью подсказки
const isTooltipVisible = ref(false);
let tooltipTimeout: ReturnType<typeof setTimeout>;

// Функция для показа подсказки и её автоматического скрытия
const showTooltip = () => {
    isTooltipVisible.value = true;
    clearTimeout(tooltipTimeout);

    tooltipTimeout = setTimeout(() => {
        isTooltipVisible.value = false;
    }, 1200);
};

// Функция для смены темы
const toggleTheme = () => {
    const newTheme = isDarkTheme.value ? 'light-theme' : 'dark-theme';
    isDarkTheme.value = newTheme === 'dark-theme';
    document.body.className = newTheme;
    store.commit('theme/setTheme', newTheme);
    localStorage.setItem('theme', newTheme);
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme.value = savedTheme;
        isDarkTheme.value = savedTheme === 'dark-theme';
        document.body.className = savedTheme;
        store.commit('theme/setTheme', savedTheme);
    }
});
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
    cursor: pointer;
}

.navbar__btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
    padding-right: 20px;
}

.theme-switch-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.theme-button {
    background-color: var(--button-color);
    border: 2px solid var(--button-color);
    border-radius: 50%;
    padding: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
}

.theme-button:hover {
    background-color: var(--primary-color);
    border-color: var(--secondary-color);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
}

.theme-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
}

.theme-button:hover .theme-icon {
    transform: rotate(20deg);
}

.theme-tooltip {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.9rem;
    white-space: nowrap;
    pointer-events: none;
    transition: opacity 0.3s ease;
}
</style>
