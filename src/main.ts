import { createApp, h } from 'vue';

import App from '@/App.vue';

import router from '@/router/router';

import components from '@/components/UI';

import directives from '@/directives';

import store from '@/store';

import { ComponentWithname } from '@/interfaces/currency';

import './assets/scss/global.scss';

const app = createApp({
    render: () => h(App),
});

(components as any).forEach((component: any) => {
    app.component(component.__name, component);
});

directives.forEach((directive) => {
    app.directive(directive.name, directive);
});

app.use(router).use(store).mount('#app');
