import { serverUri } from '@/constants'
import type { Order } from '@/models'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
	const orders = ref<Order[]>([])

	const loadOrders = async () => {
		const request = await fetch(`${serverUri}/order`)
		if (request.ok) {
			orders.value = (await request.json()) as Order[]
		}
	}
	loadOrders()

	const addOrder = (order: Order) => {
		orders.value.push(order)
	}

	const lastOrder: Ref<Order | undefined> = computed(() => orders.value[orders.value.length - 1])

	return {
		orders,
		lastOrder,
		addOrder,
	}
})
