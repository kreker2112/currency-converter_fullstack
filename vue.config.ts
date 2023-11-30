import { defineConfig } from '@vue/cli-service';
import { Configuration } from 'webpack';

export default defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            sass: {
                implementation: require('sass'),
            },
            scss: {
                additionalData: `@import "@/assets/scss/global.scss";`,
            },
        },
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ['vue-style-loader', 'css-loader', 'sass-loader'],
                },
            ],
        } as Configuration['module'],
    },
});
