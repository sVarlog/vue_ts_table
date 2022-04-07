<template>
    <div id="app">
		<Table />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Table from '@/components/Table.vue';
import { mapActions } from 'vuex';
import { CHECK_ITEM_LOCAL_STORAGE_ACTION } from './store/types';

export default Vue.extend({
	name: 'App',
	
	components: {
		Table
	},

	created() {
		this.checkItemsFromLocalStore();
	},

	methods: {
		...mapActions({
			checkItemsFromLocalStore: CHECK_ITEM_LOCAL_STORAGE_ACTION
		})
	}
});
</script>

<style lang="scss">
@import '@/assets/variables.scss';

#app{
	min-width: 100%;
	overflow-x: hidden;
	width: 100%;
	height: 100%;
	min-height: 100vh;
	background: $pageBgColor;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
