import type { Item, Payment } from './'

export interface Order {
	items: Item[]
	total: number
	payment: Payment
}
