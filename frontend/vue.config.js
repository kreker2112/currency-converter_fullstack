import { defineConfig } from '@vue/cli-service';
import path from 'path';

const generalVarsFiles = ['/assets/scss/_variables.scss'];

export default defineConfig({
    transpileDependencies: true,
    publicPath:
        process.env.NODE_ENV === 'production' ? '/converter.github.io' : '/',
    chainWebpack: (config) => {
        config.plugin('define').tap((definitions) => {
            Object.assign(definitions[0], {
                __VUE_OPTIONS_API__: JSON.stringify(true),
                __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
            });
            return definitions;
        });
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: async (content, loaderContext) => {
                    const { resourcePath, rootContext } = loaderContext;

                    const relativePath = path.relative(
                        rootContext,
                        resourcePath,
                    );
                    const varsFiles = [...generalVarsFiles];

                    const varsFilesImport = varsFiles.map(
                        (item) => `@import "@${item}";`,
                    );

                    const skipVarFiles = varsFilesImport.some((item) => {
                        const fileName = item.match(/\/(_.+\.scss)";$/)[1];
                        return relativePath.includes(fileName);
                    });

                    if (skipVarFiles) {
                        return;
                    }

                    return '\n' + varsFilesImport.join('\n') + content;
                },
            },
        },
    },
});
