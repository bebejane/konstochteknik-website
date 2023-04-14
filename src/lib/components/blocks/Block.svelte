<script lang="ts">
	import * as Blocks from "./";
	export let data: any;
	let slide = data.slide[0];
</script>

{#if slide}
	{#if slide.__typename === "ImageRecord"}
		<svelte:component this={Blocks.Image} data={slide} />
	{:else if slide.__typename === "ImageDoubleRecord"}
		<svelte:component this={Blocks.ImageDouble} data={slide} />
	{:else if slide.__typename === "ImageQuadRecord"}
		<svelte:component this={Blocks.ImageQuad} data={slide} />
	{/if}
{/if}
