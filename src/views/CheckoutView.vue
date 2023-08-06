<script setup lang="ts">
import { Button, Calendar, InputMask, InputText, Sidebar, useToast } from '@/components'
import { computed, ref } from 'vue'
import { useCartStore, useOrderStore, useSidebarStore, SidebarEnum } from '@/stores'
import { serverUri } from '@/constants'
import type { Order } from '@/models'

const toast = useToast()
const sidebarStore = useSidebarStore()
const isVisible = computed({
	get() {
		return sidebarStore.currentSidebar === SidebarEnum.Chekout
	},
	set(value) {
		if (value === true) {
			sidebarStore.showSidebar(SidebarEnum.Chekout)
		} else {
			sidebarStore.showSidebar(SidebarEnum.None)
		}
	},
})

const orderStore = useOrderStore()
const cartStore = useCartStore()

const cardNumber = ref('')
const expirationDate = ref('')
const cardCvc = ref('')
const cardName = ref('')

const isFormValid = computed(
	() => !!cardNumber.value && !!expirationDate.value && !!cardCvc.value && !!cardName.value,
)

const submitOrder = async () => {
	const order: Order = {
		Items: cartStore.cart,
		Total: cartStore.cartPrice,
		Payment: {
			cardNumber: cardNumber.value.replace(/\s/g, ''),
			expirationDate: expirationDate.value,
			cvc: cardCvc.value,
			cardName: cardName.value,
		},
	}
	const response = await fetch(`${serverUri}/order`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(order),
	})
	if (response.ok) {
		orderStore.addOrder(order)
		cartStore.emptyCart()
		sidebarStore.showSidebar(SidebarEnum.Sucessfull)
	} else {
		toast.add({
			group: 'br',
			severity: 'error',
			summary: 'Info',
			detail: 'The order failed. Try again in a few moments.',
			life: 3000,
		})
	}
}
</script>

<template>
	<Sidebar
		v-model:visible="isVisible"
		position="right"
		id="checkout-sidebar"
		class="checkout-sidebar"
	>
		<template #header>
			<header>
				<Button
					text
					rounded
					severity="secondary"
					size="small"
					icon="pi pi-arrow-left"
					@click="sidebarStore.showSidebar(SidebarEnum.Cart)"
				/>
				<span>Checkout</span>
			</header>
		</template>
		<form class="checkout-form">
			<div class="form-line">
				<span class="p-float-label p-input-icon-left p-input-icon-right">
					<i class="pi pi-credit-card" />
					<InputMask
						id="credit-card"
						v-model="cardNumber"
						mask="9999 9999 9999 9999"
						autocomplete="off"
					/>
					<label for="credit-card">Credit Card</label>
					<i class="pi pi-user" />
				</span>
			</div>
			<div class="form-line">
				<span class="p-float-label p-input-icon-left mr1">
					<i class="pi pi-calendar" />
					<Calendar id="expiration-date" v-model="expirationDate" dateFormat="mm/yy" class="pdl2" />
					<label for="expiration-date">MM/YY</label>
				</span>
				<span class="p-float-label p-input-icon-left ml1">
					<i class="pi pi-key" />
					<InputMask id="card-cvc" v-model="cardCvc" mask="999" autocomplete="off" />
					<label for="card-cvc">CVC</label>
				</span>
			</div>
			<div class="form-line">
				<span class="p-float-label p-input-icon-left">
					<i class="pi pi-user" />
					<InputText id="card-name" v-model="cardName" autocomplete="off" />
					<label for="card-name">Name on card</label>
				</span>
			</div>
			<div class="form-line">
				<Button
					outlined
					class="button mr1"
					size="large"
					@click="sidebarStore.showSidebar(SidebarEnum.Cart)"
					>Back</Button
				>
				<Button class="button ml1" size="large" @click="submitOrder" :disabled="!isFormValid"
					>Pay ${{ cartStore.cartPrice.toFixed(2) }}</Button
				>
			</div>
		</form>
	</Sidebar>
</template>

<style scoped lang="scss">
header {
	display: flex;
}
.checkout-form {
	display: flex;
	flex-direction: column;
	.form-line {
		margin-top: 0.5rem;
		margin-bottom: 1rem;
		display: flex;
		.p-float-label {
			width: 100%;
		}
		.mr1 {
			margin-right: 0.5rem;
		}
		.ml1 {
			margin-left: 0.5rem;
		}
	}
	input {
		width: 100%;
	}
	button {
		width: 100%;
		justify-content: center;
	}
}
</style>

<style lang="scss">
#checkout-sidebar.checkout-sidebar {
	width: 32rem;

	.p-sidebar-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 2rem;
		padding: 1rem;
	}
	.p-sidebar-content {
		padding: 1rem;
		display: flex;
		flex-direction: column;
	}
	.p-input-icon-left .pdl2 input {
		padding-left: 2.5rem;
	}
}
</style>
