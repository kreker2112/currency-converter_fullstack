import { createApp, App } from 'vue';
import AppVue from '@/App.vue';
import router from '@/router/router';
import components from '@/components/UI';
import directives from '@/directives';
import store from '@/store';

const app: App = createApp(AppVue);

components.forEach((component) => {
    app.component(component.name, component);
});

directives.forEach((directive) => {
    app.directive(directive.name, directive);
});

app.use(router).use(store).mount('#app');
