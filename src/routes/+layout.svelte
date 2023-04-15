<script lang="ts">
	import "$lib/styles/index.scss";
	export let data;
</script>

<div class="layout">
	<slot />
</div>

<style lang="scss">
	.layout {
		max-height: 100vh;
		height: 100vh;
	}
</style>
