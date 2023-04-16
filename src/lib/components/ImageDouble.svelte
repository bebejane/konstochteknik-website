<script lang="ts">
	import { Image } from "@datocms/svelte";
	export let data: any;
	export let active: boolean = false;

	let { images } = data as ImageDoubleRecord;
	let imageLeft = images[0];
	let imageRight = images[1];
</script>

{#if imageLeft.responsiveImage && imageRight.responsiveImage}
	<div>
		<Image
			data={imageLeft.responsiveImage}
			fadeInDuration={0}
			class="image-double"
			objectFit="contain"
			lazyLoad={true}
		/>
		<Image
			data={imageRight.responsiveImage}
			fadeInDuration={0}
			class="image-double"
			objectFit="contain"
			lazyLoad={true}
		/>
	</div>
{:else}
	<p>Image double block</p>
{/if}

<style lang="scss">
	div {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: row;
	}
	:global(.image-double) {
		margin: 2%;
		width: 50%;
		flex: 0 1 50%;
	}
</style>
