import IntroPage from '@/pages/IntroPage.vue';
import ConverterPage from '@/pages/ConverterPage.vue';
import CurrenciesList from '@/pages/CurrenciesList.vue';
import ResultPage from '@/pages/ResultPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: IntroPage,
        name: 'introPage',
        meta: {
            layout: 'defaultLayout',
        },
    },
    {
        path: '/converter',
        component: ConverterPage,
        name: 'converterPage',
        meta: {
            layout: 'currencyLayout',
        },
    },
    {
        path: '/converter/currencies',
        component: CurrenciesList,
        name: 'currenciesList',
        meta: {
            layout: 'currencyLayout',
        },
    },
    {
        path: '/converter/result',
        component: ResultPage,
        name: 'resultPage',
        meta: {
            layout: 'currencyLayout',
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
