import type { Item } from '@/models'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
	let localCart = []
	if (localStorage.cart) {
		try {
			localCart = JSON.parse(localStorage.cart)
		} catch (err) {
			console.error('Error parsing local storage data', err)
		}
	}
	const cart = ref<Item[]>(localCart)
	const cartCount = computed(() => cart.value.length)
	const cartPrice = computed(() => cart.value.reduce((acc, item) => acc + item.quantity * item.price, 0))

	const addToCart = (item: Item) => {
		const index = cart.value.findIndex((i) => i.id === item.id)
		if (index !== -1) {
			cart.value[index].quantity++
		} else {
			item.quantity ??= 1
			cart.value.push(item)
		}
		localStorage.cart = JSON.stringify(cart.value)
	}
	const removeFromCart = (item: Item) => {
		cart.value = cart.value.filter((i) => i.id !== item.id)
		localStorage.cart = JSON.stringify(cart.value)
	}
	const emptyCart = () => {
		cart.value = []
		localStorage.cart = JSON.stringify(cart.value)
	}

	return {
		cart,
		cartCount,
		cartPrice,
		addToCart,
		removeFromCart,
		emptyCart,
	}
})
