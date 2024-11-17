import { useCookies } from 'vue3-cookies'
import main_page from "@/pages/main_page.vue"
import noteboard_page from "@/pages/noteboard_page.vue"
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

const { cookies } = useCookies()

// Вспомогательная функция для проверки авторизации
const checkAuth = (next: NavigationGuardNext, redirectTo: string, isAuthorized: boolean) => {
    const token = cookies.get('accessToken')
    
    // Если авторизован, переходим на нужную страницу или оставляем
    if (token && isAuthorized || !token && !isAuthorized) {
        next() 
    } else {
        next({ name: redirectTo })
    }
}


const routes = [
    {
        path: '/',
        name: 'main',
        component: main_page,
        beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            // Пользователь не авторизован и остаётся на main
            checkAuth(next, 'noteboard', false)
        }
    },
    {
        path: '/noteboard',
        name: 'noteboard',
        component: noteboard_page,
        beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            // Пользователь авторизовани попадает на noteboard
            checkAuth(next, 'main', true)
        }
    }
]

export default routes
