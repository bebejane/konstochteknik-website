<script lang="ts">
	import { Image } from "@datocms/svelte";
	export let data: any;
	export let active: boolean = false;
	let { video, backgroundImage, poster } = data as VideoRecord;
	//@ts-ignore
	let src = video.video?.mp4high as string;
	let player: HTMLVideoElement;

	function togglePlay() {
		player.paused ? player.play() : player.pause();
	}

	$: active ? player?.play() : player?.pause();
</script>

<div>
	<div class="monitor">
		<img src="/images/monitor.png" alt="monitor" />
		<video poster={poster?.url} muted bind:this={player} on:click|stopPropagation>
			<source {src} type="video/mp4" />
			<track kind="captions" />
		</video>
	</div>

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
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100%;

		.monitor {
			position: absolute;
			height: calc(100vh - 200px);
			width: auto;
			img {
				height: 100%;
				width: auto;
			}
			video {
				position: absolute;
				z-index: 1;
				left: 3.3%;
				top: 4%;
				width: 93.6%;
				border-radius: 2px;
			}
			video[poster] {
				max-height: calc(72.5%);
				object-fit: cover;
				margin: 0;
			}
			@include mq($until: tablet) {
				transform: scale(0.6);
			}
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
