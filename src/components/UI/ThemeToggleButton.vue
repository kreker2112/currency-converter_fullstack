<template>
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
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDarkTheme = ref(localStorage.getItem('theme') === 'dark-theme');

const toggleTheme = () => {
    const newTheme = isDarkTheme.value ? 'light-theme' : 'dark-theme';
    isDarkTheme.value = newTheme === 'dark-theme';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    isDarkTheme.value = savedTheme === 'dark-theme';
    document.body.className = savedTheme;
});
</script>

<style scoped lang="scss">
.theme-switch-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.theme-button {
    background-image: linear-gradient(
        var(--secondary-color),
        var(--primary-color)
    );
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
