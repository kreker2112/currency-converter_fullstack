import MainPage from '@/pages/MainPage.vue'
import ConverterPage from '@/pages/ConverterPage.vue'
import CurrenciesList from '@/pages/CurrenciesList.vue'
import ResultPage from '@/pages/ResultPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/converter',
        component: ConverterPage,
        name: 'converterPage',
    },
    {
        path: '/converter/currencies',
        component: CurrenciesList,
        name: 'currenciesList',
    },
    {
        path: '/converter/result',
        component: ResultPage,
        name: 'resultPage',
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
