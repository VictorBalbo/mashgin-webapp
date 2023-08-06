<script setup lang="ts">
import { PageHeader, PageFooter } from '@/components'
import { RouterView } from 'vue-router'
</script>

<template>
	<PageHeader />
	<RouterView />
	<PageFooter />
</template>

<style scoped></style>
