<script setup lang="ts">
import { Sidebar } from '@/components'
import { computed } from 'vue'
import { useOrderStore, useSidebarStore, SidebarEnum } from '@/stores'

const sidebarStore = useSidebarStore()
const orderStore = useOrderStore()
const isVisible = computed({
	get() {
		return sidebarStore.currentSidebar === SidebarEnum.Sucessfull
	},
	set(value) {
		if (value === true) {
			sidebarStore.showSidebar(SidebarEnum.Sucessfull)
		} else {
			sidebarStore.showSidebar(SidebarEnum.None)
		}
	},
})

const obfuscateCardNumber = (cardNumber?: string) => `************${cardNumber?.slice(12)}`
</script>

<template>
	<Sidebar
		v-model:visible="isVisible"
		position="right"
		id="successful-checkout-sidebar"
		class="successful-checkout-sidebar"
	>
		<section class="successful-checkout">
			<span class="image-container">
				<span class="pi pi-check image"></span>
			</span>
			<span class="title">Approved</span>
			<div class="text-line">
				<span class="text">Billed to</span>
				<span class="fill-space"></span>
				<span class="text">{{
					obfuscateCardNumber(orderStore.lastOrder?.payment.card_number)
				}}</span>
			</div>
			<div class="text-line">
				<span class="text">Total</span>
				<span class="fill-space"></span>
				<span class="text">{{ orderStore.lastOrder?.total.toFixed(2) }}</span>
			</div>
		</section>
	</Sidebar>
</template>

<style scoped lang="scss">
.successful-checkout {
	height: 100%;
	width: 75%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 10rem;

	.image-container {
		background: linear-gradient(135deg, #40a98f, #79c068);
		color: white;
		border-radius: 500px;
		padding: 2rem 1.75rem;
		margin-bottom: 3rem;
	}
	.image {
		font-size: 8rem;
	}
	.title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 2.5rem;
	}
	.text-line {
		width: 100%;
		display: flex;
	}
	.fill-space {
		flex-grow: 1;
		border-bottom: dotted 2px;
		margin: 0 0.75rem 0.25rem;
	}
	.text {
		align-self: flex-start;
	}
}
</style>

<style lang="scss">
@import '@/assets/main';
#successful-checkout-sidebar.successful-checkout-sidebar {
	width: 32rem;

	.p-sidebar-content {
		padding: $defaultSpacing;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}
</style>
