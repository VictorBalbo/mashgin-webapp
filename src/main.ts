import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Router from './router'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'
import BadgeDirective from 'primevue/badgedirective'
import ToastService from 'primevue/toastservice'

const pinia = createPinia()
const app = createApp(App)

app.use(PrimeVue)
app.directive('badge', BadgeDirective)
app.use(ToastService)

app.use(Router)

app.use(pinia)

app.mount('#app')
