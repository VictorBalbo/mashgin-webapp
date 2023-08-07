<script setup lang="ts">
import { Button, Divider, Sidebar, MenuItemList } from '@/components'
import { useCartStore, SidebarEnum, useSidebarStore } from '@/stores'
import { computed } from 'vue'

const cartStore = useCartStore()

const sidebarStore = useSidebarStore()
const isVisible = computed({
	get() {
		return sidebarStore.currentSidebar === SidebarEnum.Cart
	},
	set(value) {
		if (value === true) {
			sidebarStore.showSidebar(SidebarEnum.Cart)
		} else {
			sidebarStore.showSidebar(SidebarEnum.None)
		}
	},
})
</script>

<template>
	<Sidebar v-model:visible="isVisible" position="right" id="cart-sidebar" class="cart-sidebar">
		<template #header> Cart </template>
		<Transition>
			<section v-if="cartStore.cart.length" class="cart">
				<section class="cart-items">
					<div v-for="(item, index) in cartStore.cart" :key="item.id">
						<MenuItemList
							:item="item"
							@update-quantity="(quantity) => (item.quantity = quantity)"
						/>
						<Divider v-if="index !== cartStore.cart.length - 1" />
					</div>
				</section>
				<Divider />
				<section class="payment-section">
					<div class="total-section">
						<span>Total</span> <span>{{ cartStore.cartPrice.toFixed(2) }}</span>
					</div>
					<div class="pay-buttons">
						<Button outlined class="button mr1" size="large" @click="cartStore.emptyCart"
							>Clear</Button
						>
						<Button
							class="button ml1"
							size="large"
							@click="sidebarStore.showSidebar(SidebarEnum.Chekout)"
							>Pay</Button
						>
					</div>
				</section>
			</section>
			<section v-else-if="!cartStore.cart.length" class="cart-placeholder">
				<span class="placeholder-container">
					<span class="pi pi-shopping-cart placeholder"></span>
				</span>
				<span class="title">Cart is empty</span>
				<span class="subtitle">Add items to the cart from the menu</span>
			</section>
		</Transition>
	</Sidebar>
</template>

<style scoped lang="scss">
.cart {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	height: 100%;
}
.cart-items {
	flex-grow: 1;
}
.payment-section {
	display: flex;
	flex-direction: column;
	font-size: 2rem;
}
.total-section {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	font-size: 2rem;
	margin-top: rem;
	margin-bottom: 2.25rem;
}
.pay-buttons {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	font-size: 2rem;
	margin: 0rem 0;
	.button {
		width: 100%;
		justify-content: center;
	}
	.mr1 {
		margin-right: 0.5rem;
	}
	.ml1 {
		margin-left: 0.5rem;
	}
}
.cart-placeholder {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.placeholder-container {
		background: linear-gradient(135deg, #40a98f, #79c068);
		color: white;
		border-radius: 500px;
		padding: 2.5rem 2rem 1.5rem 2rem;
		margin-bottom: 3rem;
	}
	.placeholder {
		font-size: 10rem;
	}
	.title {
		font-size: 1.5rem;
		font-weight: 600;
	}
}
// Cart Fade Transition
.v-enter-active,
.v-leave-active {
	transition: all 0.5s ease;
}

.v-enter-from {
	opacity: 0;
}
.v-leave-to {
	opacity: 0;
	position: absolute;
}
</style>

<style lang="scss">
#cart-sidebar.cart-sidebar {
	width: 32rem;
	max-width: 100%;

	.p-sidebar-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 2rem;
		padding: 1rem;
	}
	.p-sidebar-content {
		padding: 1rem;
		height: 100%;
	}
}
</style>
