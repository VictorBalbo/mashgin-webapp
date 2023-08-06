<script setup lang="ts">
import { Divider } from '@/components'
</script>

<template>
	<footer>
		<Divider />
		<span>Mashgin © {{ new Date().getFullYear() }}</span>
	</footer>
</template>

<style scoped>
footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
	color: #6c757d;
}
.p-divider.p-divider-horizontal {
	margin-top: 0;
	margin-bottom: 1rem;
}
</style>
