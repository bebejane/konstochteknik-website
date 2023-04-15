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
		<Image data={imageLeft.responsiveImage} pictureClass="image-left" objectFit="cover" />
		<Image
			data={imageRight.responsiveImage}
			pictureClass="image-right"
			objectFit="cover"
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
	:global(.image-left) {
		width: 50%;
	}
	:global(.image-right) {
		width: 50%;
	}
</style>
