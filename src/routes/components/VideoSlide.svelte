<script lang="ts">
	export let data: any;
	export let active: boolean = false;

	let { backgroundImage, poster, css } = data as VideoSlideRecord;
	let video = data.video as VideoRecord & { video: VideoRecord["video"] & { mp4high: string } };
	let src = video.video?.mp4high;
	let player: HTMLVideoElement;

	$: process.env.NODE_ENV === "production" && active ? player?.play() : player?.pause();
</script>

<div
	style={`${backgroundImage ? `background-image:url(${backgroundImage?.url}?w=2000);` : ""} ${
		css ?? ""
	}`}
>
	<div class="monitor">
		<img src="/images/monitor.png" alt="monitor" />
		<video poster={poster?.url} muted bind:this={player}>
			<source {src} type="video/mp4" />
			<track kind="captions" />
		</video>
	</div>
</div>

<style lang="scss">
	div {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		max-width: 100vw;

		.monitor {
			position: absolute;
			height: calc(70%);
			width: auto;
			z-index: 2;

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
				height: 70vw;
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
			z-index: 0;
		}
	}
</style>
