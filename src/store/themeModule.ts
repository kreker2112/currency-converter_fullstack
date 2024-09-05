import { Module } from 'vuex';

export interface ThemeState {
    currentTheme: string;
}

const themeModule: Module<ThemeState, any> = {
    state: () => ({
        currentTheme: localStorage.getItem('theme') || 'light-theme',
    }),
    getters: {
        getCurrentTheme: (state) => state.currentTheme,
    },
    mutations: {
        setTheme: (state, theme: string) => {
            state.currentTheme = theme;
            localStorage.setItem('theme', theme);
        },
    },
};

export default themeModule;
