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
		{
			path: '/cart',
			name: 'Cart',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('@/views/CartView.vue'),
		},
	],
})

export default router
