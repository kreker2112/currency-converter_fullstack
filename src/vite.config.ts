import { defineConfig } from 'vite';

export default defineConfig({
    // Другие опции конфигурации...
    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
    },
});
