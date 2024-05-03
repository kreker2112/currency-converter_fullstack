import { defineConfig } from '@vue/cli-service';
import path from 'path';

const generalVarsFiles = ['/assets/scss/_variables.scss'];

export default defineConfig({
    transpileDependencies: true,
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
    devServer: {
        host: '35.156.19.206', // указываем хост, который будет доступен для всех сетевых интерфейсов
        port: 8080, // указываем порт
    },
});
