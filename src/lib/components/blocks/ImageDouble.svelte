<script lang="ts">
	import { Image } from "@datocms/svelte";
	export let data: ImageDoubleRecord;

	let { images } = data;
	let imageLeft = images[0];
	let imageRight = images[1];
</script>

<div>
	<Image data={imageLeft.responsiveImage} pictureClass="image-left" objectFit="cover" />
	<Image
		data={imageRight.responsiveImage}
		pictureClass="image-right"
		objectFit="cover"
		lazyLoad={true}
	/>
</div>

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
