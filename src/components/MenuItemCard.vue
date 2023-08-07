<script setup lang="ts">
import { Button, Card } from '@/components'
import { type Item } from '@/models'
import { useCartStore, SidebarEnum, useSidebarStore } from '@/stores'

const cartStore = useCartStore()
const sidebarStore = useSidebarStore()
defineProps<{ item: Item }>()
const onAddToCartClick = (item: Item) => {
	cartStore.addToCart(item)
	sidebarStore.showSidebar(SidebarEnum.Cart)
}
</script>

<template>
	<Card class="item-card">
		<template #header>
			<img class="item-image" :src="`/images/${item.image_id}.jpg`" />
		</template>
		<template #title> {{ item.name }} </template>
		<template #subtitle> <span class="pi pi-tag" /> {{ item.category_name }} </template>
		<template #footer>
			<div class="item-footer">
				<span>${{ item.price.toFixed(2) }}</span>
				<Button icon="pi pi-shopping-cart" @click="onAddToCartClick(item)" />
			</div>
		</template>
	</Card>
</template>

<style scoped lang="scss">
@import '@/assets/main';
.item-card {
	display: flex;
	flex-direction: column;
	width: $cardWidth;
	margin: $defaultSpacing auto;
	overflow: hidden;
	box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
	transition: box-shadow 0.1s linear;
	&:hover {
		box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.4);
	}
}
.item-image {
	width: $cardWidth;
	height: $cardHeight;
	object-fit: cover;
}
.item-footer {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-size: 1.2rem;
	font-weight: 500;
}
</style>

<style lang="scss">
.item-card.p-card {
	.p-card-body {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
	.p-card-content {
		padding: 0;
		flex-grow: 1;
	}
}
</style>
