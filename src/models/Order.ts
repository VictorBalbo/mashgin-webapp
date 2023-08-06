import type { Item, Payment } from './'

export interface Order {
	Items: Item[]
	Total: number
	Payment: Payment
}
