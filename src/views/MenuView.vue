<script setup lang="ts">
import { CartView, CheckoutView, SuccessfulCheckout } from '@/views'
import { type Menu } from '@/models'
import { ref } from 'vue'
import { serverUri } from '@/constants'
import { Toast, MenuItemCard, MenuItemSkeleton } from '@/components'

let menu = ref<Menu>()

const getMenu = async () => {
	const request = await fetch(`${serverUri}/menu`)
	const menuResponse = (await request.json()) as Menu

	const getCategoryForItem = (id: number) => menuResponse.categories.find((c) => c.id === id)

	menuResponse.items = menuResponse.items.map((i) => {
		i.category_name = getCategoryForItem(i.category_id)?.name
		return i
	})
	menu.value = menuResponse
}
getMenu()
</script>

<template>
	<main>
		<section v-if="!menu" class="menu-list">
			<MenuItemSkeleton v-for="i in 5" :key="i" />
		</section>
		<section v-else class="menu-list">
			<MenuItemCard v-for="item in menu?.items" :key="item.id" :item="item" />
		</section>
		<CartView />
		<CheckoutView />
		<SuccessfulCheckout />
		<Toast position="bottom-right" group="br" />
	</main>
</template>

<style scoped lang="scss">
@import url('@/assets/main.scss');
.menu-list {
	margin: 1rem;
	display: grid;
	grid-template-columns: repeat(auto-fill, 22rem);
	justify-content: center;
}
</style>
