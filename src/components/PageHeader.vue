<script setup lang="ts">
import { ref } from 'vue'
import Logo from '@/assets/logo.png'
import { Avatar, Menu } from '@/components'
import { useCartStore, useSidebarStore, SidebarEnum } from '@/stores'

const menu = ref()

const cartStore = useCartStore()
const sidebarStore = useSidebarStore()

const toggleMenu = (event: Event) => {
	menu.value.toggle(event)
}

const items = ref([
	{
		label: 'My Cart',
		icon: 'pi pi-shopping-cart',
		command: () => sidebarStore.showSidebar(SidebarEnum.Cart),
	},
	{ label: 'My Orders', icon: 'pi pi-shopping-bag' },
])
</script>

<template>
	<header>
		<img :src="Logo" alt="" width="200" />
		<div class="cart-avatar-container">
			<Transition>
				<span
					v-if="cartStore.cartCount"
					class="cart-icon"
					@click="sidebarStore.showSidebar(SidebarEnum.Cart)"
				>
					<span v-badge="cartStore.cartCount" class="pi pi-shopping-cart p-overlay-badge cart" />
				</span>
			</Transition>
			<Avatar class="avatar" icon="pi pi-user" size="large" shape="circle" @click="toggleMenu" />
			<Menu ref="menu" id="header-menu" :model="items" :popup="true" />
		</div>
	</header>
</template>

<style scoped lang="scss">
header {
	height: 80px;
	padding: 15px;
	background: linear-gradient(135deg, #40a98f, #79c068);
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.cart-avatar-container {
	display: flex;
	align-items: center;

	.cart-icon {
		margin-right: 20px;
		color: black;
		background: #dee2e6;
		border-radius: 50px;
		padding: 0.75rem 0.75rem 0.563rem 0.75rem;
		cursor: pointer;
	}
	.cart {
		font-size: 1.5rem;
	}
	.avatar {
		cursor: pointer;
	}
}

// Cart Fade Transition
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>

<style>
#header-menu .p-focus .p-menuitem-content {
	background: white;
}
#header-menu .p-focus .p-menuitem-content:hover {
	background: #e9ecef;
}
</style>
