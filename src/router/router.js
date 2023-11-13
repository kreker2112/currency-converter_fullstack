import MainPage from '@/pages/MainPage.vue'
import ConverterPage from '@/pages/ConverterPage.vue'
import CurrenciesList from '@/pages/CurrenciesList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/converter',
        component: ConverterPage,
    },
    {
        path: '/currencies',
        component: CurrenciesList,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
