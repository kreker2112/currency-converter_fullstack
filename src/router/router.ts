import IntroPage from '@/pages/IntroPage.vue';
import ConverterPage from '@/pages/ConverterPage.vue';
import CurrenciesList from '@/pages/CurrenciesList.vue';
import ResultPage from '@/pages/ResultPage.vue';
import ReceiptsPage from '@/pages/ReceiptsPage.vue';
import TaxObligationsPage from '@/pages/TaxObligationsPage.vue';
import PayingTaxesPage from '@/pages/PayingTaxesPage.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

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
    {
        path: '/receipts',
        component: ReceiptsPage,
        name: 'receiptsPage',
        meta: {
            layout: 'receiptsLayout',
        },
    },
    {
        path: '/obligations',
        component: TaxObligationsPage,
        name: 'obligations',
        meta: {
            layout: 'receiptsLayout',
        },
    },
    {
        path: '/taxes',
        component: PayingTaxesPage,
        name: 'taxes',
        meta: {
            layout: 'receiptsLayout',
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
});

export default router;
