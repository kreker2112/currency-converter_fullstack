import { Module } from 'vuex';

export interface ThemeState {
    currentTheme: string;
}

const themeModule: Module<ThemeState, any> = {
    state: () => ({
        currentTheme: 'light-theme',
    }),
    getters: {
        getCurrentTheme: (state) => state.currentTheme,
    },
    mutations: {
        setTheme: (state, theme: string) => {
            state.currentTheme = theme;
        },
    },
};

export default themeModule;
