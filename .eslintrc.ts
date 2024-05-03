/// <reference types="node" />

import { Linter } from 'eslint';

const config: Linter.Config = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true, // Обновлено для поддержки последних возможностей ECMAScript
    },
    extends: [
        'eslint:recommended', // Базовый набор правил ESLint
        'plugin:@typescript-eslint/recommended', // Правила для TypeScript
        'plugin:vue/vue3-recommended', // Правила для Vue 3
        'plugin:prettier/recommended', // Правила Prettier для интеграции с ESLint
    ],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto', // Обеспечивает совместимость переносов строк между разными ОС
            },
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // Правило для console.log в продакшене
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // Правило для отладчика в продакшене
    },
    globals: {
        $nuxt: 'readonly', // Глобальная переменная для Nuxt.js
    },
    parser: 'vue-eslint-parser', // Парсер для .vue файлов
    parserOptions: {
        parser: '@typescript-eslint/parser', // Указываем парсер TypeScript
        sourceType: 'module', // Модульный тип исходников
    },
    plugins: [
        '@typescript-eslint', // Плагин для правил TypeScript
        'prettier', // Плагин для интеграции Prettier
    ],
};

export default config;
