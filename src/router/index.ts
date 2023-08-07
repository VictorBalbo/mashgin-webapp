import { createRouter, createWebHistory } from 'vue-router'
import { MenuView } from '@/views'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Menu',
			component: MenuView,
		},
	],
})

export default router
