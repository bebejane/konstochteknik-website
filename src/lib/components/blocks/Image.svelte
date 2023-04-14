<script lang="ts">
	import Image from "@datocms/svelte/components/Image/Image.svelte";
	export let data: ImageRecord;

	let { layout, image, backgroundImage } = data;

	$: data.image.responsiveImage === null && console.log(data);
</script>

<figure>
	{#if image.responsiveImage}
		<Image
			data={image.responsiveImage}
			class="image"
			objectFit={layout === "image-full" ? "cover" : "contain"}
			pictureClass={`image ${layout}`}
		/>
	{/if}
	{#if backgroundImage?.responsiveImage}
		<Image
			data={backgroundImage.responsiveImage}
			class="image-background"
			objectFit="cover"
			lazyLoad={true}
		/>
	{/if}
</figure>

<style lang="scss">
	figure {
		position: relative;
		height: 100%;
	}
	:global(.image) {
		min-height: 100%;
		max-height: 100%;
		min-width: 100%;
	}
	:global(.image-full) {
		min-height: 100%;
		max-height: 100%;
		min-width: 100%;
		object-fit: contain;
	}
	:global(.image-margin) {
		margin-left: auto;
		margin-right: auto;
		max-width: 50%;
	}
	:global(.image-margin-portrait) {
		margin-left: auto;
		margin-right: auto;
		min-height: 100%;
		max-width: 50%;
		width: 50%;
	}
	:global(.image-background) {
		position: absolute !important;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
	}
</style>
