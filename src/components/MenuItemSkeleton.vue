<script setup lang="ts">
import { Skeleton } from '@/components'
</script>

<template>
	<div class="item-card">
		<Skeleton height="15rem" class="skeleton-item"></Skeleton>
		<Skeleton class="skeleton-item"></Skeleton>
		<Skeleton width="10rem" class="skeleton-item"></Skeleton>
		<Skeleton width="5rem" class="skeleton-item"></Skeleton>
	</div>
</template>

<style scoped lang="scss">
@import '@/assets/main';
.item-card {
	width: $cardWidth;
	margin: $defaultSpacing auto;
}
.skeleton-item {
	margin-bottom: 0.5rem;
}
</style>
