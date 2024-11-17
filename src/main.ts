import './assets/main.sass'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router'
import VueCookies from 'vue3-cookies'

const router = createRouter({
    history: createWebHistory(), routes,
})

const app = createApp(App)

app.use(createPinia()).use(router).use(VueCookies).mount('#app')
