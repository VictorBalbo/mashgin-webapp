import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum SidebarEnum {
	None,
	Cart,
	Chekout,
	Sucessfull
}

export const useSidebarStore = defineStore('sidebar', () => {
	const currentSidebar = ref(SidebarEnum.None)
	const showSidebar = (sidebar: SidebarEnum) => {
		if(sidebar !== SidebarEnum.None) {
			document.body.classList.add('stop-scroll')
		} else {
			document.body.classList.remove('stop-scroll')
		}
		currentSidebar.value = sidebar
	}

	return {
		currentSidebar,
		showSidebar,
	}
})
