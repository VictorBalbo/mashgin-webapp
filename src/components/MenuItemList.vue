<script setup lang="ts">
import { Button, InputNumber } from '@/components'
import { type Item } from '@/models'
import { computed } from 'vue'
import { useCartStore } from '@/stores'

const props = defineProps<{ item: Item }>()
const emit = defineEmits(['update-quantity'])

const store = useCartStore()

const quantity = computed({
	get() {
		return props.item.quantity
	},

	set(value) {
		return emit('update-quantity', value)
	},
})

const finalPrice = computed(() => props.item.price * props.item.quantity)
</script>

<template>
	<section class="menu-item-list item-card">
		<img class="item-image" :src="`/images/${item.image_id}.jpg`" />
		<section class="item-name-category">
			<span class="item-name">{{ item.name }}</span>
			<span class="item-category"><span class="pi pi-tag" /> {{ item.category_name }}</span>
			<InputNumber
				v-model="quantity"
				showButtons
				buttonLayout="horizontal"
				incrementButtonIcon="pi pi-plus"
				decrementButtonIcon="pi pi-minus"
				:min="1"
			/>
		</section>
		<section class="item-price-quantity">
			<span class="item-price">${{ finalPrice.toFixed(2) }}</span>
			<Button
				icon="pi pi-trash"
				size="small"
				severity="danger"
				outlined
				class="delete-item"
				@click="() => store.removeFromCart(item)"
			/>
		</section>
	</section>
</template>

<style scoped lang="scss">
.item-card {
	width: 30rem;
	max-width: 100%;
	display: flex;
	flex-direction: row;
}
.item-image {
	min-width: 10rem;
	min-height: 7.5rem;
	max-width: 10rem;
	max-height: 7.5rem;
	object-fit: cover;
	border-radius: 1rem;
	@media (max-width: 480px) {
		min-width: 7.5rem;
		min-height: 5rem;
		max-width: 7.5rem;
		max-height: 5rem;
	}
}
.item-name-category {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	margin-left: 1rem;
	.item-name {
		font-size: 1.5rem;
		font-weight: 600;
	}
	.item-category {
		font-size: 1rem;
		font-weight: 300;
		flex-grow: 1;
	}
	@media (max-width: 480px) {
		.item-name {
			font-size: 1.25rem;
		}
		.item-category {
			font-size: 0.9rem;
		}
	}
}
.item-price-quantity {
	display: flex;
	flex-direction: column;
	margin-left: 1rem;
	justify-content: space-between;
	align-items: flex-end;
	.item-price {
		font-size: 1.5rem;
	}
	.delete-item {
		padding: 5px 0;
	}
	@media (max-width: 480px) {
		.item-price {
			font-size: 1.25rem;
		}
	}
}
</style>

<style lang="scss">
.menu-item-list {
	.p-inputnumber-input {
		width: 3rem;
		padding: 0 0.4rem !important;
		text-align: center;
		flex: 0;
	}
	.p-inputnumber-button {
		width: 2rem !important;
		padding: 5px 0 !important;
	}
}
</style>
