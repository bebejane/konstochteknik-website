<script lang="ts">
	import "$lib/styles/index.scss";
	import type { LayoutData } from "./$types";
	export let data: LayoutData;
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
