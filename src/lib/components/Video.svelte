<script lang="ts">
	import { Image } from "@datocms/svelte";
	export let data: any;

	let { video, backgroundImage, poster } = data as VideoRecord;
	//@ts-ignore
	let src = video.video?.mp4high as string;
</script>

<div>
	<video poster={poster?.url} controls muted>
		<source {src} type="video/mp4" />
		<track kind="captions" />
	</video>
	{#if backgroundImage?.responsiveImage}
		<Image
			data={backgroundImage.responsiveImage}
			class="video-background-image"
			objectFit="cover"
		/>
	{/if}
</div>

<style lang="scss">
	div {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		video {
			width: 50%;
			height: 50%;
		}
		:global(.video-background-image) {
			position: absolute !important;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			max-height: 100vh;
			object-fit: cover;
			z-index: -1;
		}
	}
</style>
