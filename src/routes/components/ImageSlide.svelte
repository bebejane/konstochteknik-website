<script lang="ts">
	import { Image } from "@datocms/svelte";
	export let data: any;

	let { layout, images, backgroundImage } = data as ImageSlideRecord;
	let column =
		images.length === 1 ? "single" : images.length === 2 ? "double" : "quad";
</script>

<div>
	{#each images as { image, background, layout: imageLayout }}
		{#if image.responsiveImage}
			<figure
				class={column}
				style:background-color={background?.hex}
				class:cover={imageLayout === "cover"}
			>
				<Image
					data={image.responsiveImage}
					fadeInDuration={500}
					lazyLoad={false}
					objectFit={(layout === "cover" && images.length === 1) ||
					imageLayout === "cover"
						? "cover"
						: "contain"}
					class="image"
					srcSetCandidates={[0.5, 0.75, 1, 1.5, 2, 3, 4]}
					usePlaceholder={false}
					pictureClass={`image-${layout}`}
				/>
			</figure>
		{/if}
	{/each}
	{#if backgroundImage?.responsiveImage}
		<Image
			data={backgroundImage.responsiveImage}
			fadeInDuration={500}
			class="image-background"
			objectFit="cover"
			lazyLoad={true}
		/>
	{/if}
</div>

<style lang="scss">
	div {
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100vw;
		height: 100vh;
		max-height: 100vh;
		max-width: 100vw;

		figure {
			position: relative;
			height: 100vh;
			width: 100%;
			z-index: 1;
			&.single {
				flex: 1 1 100%;
			}
			&.double {
				flex: 0 0 50%;
				height: 100%;
				padding: 4%;
				&.cover {
					padding: 0;
				}
			}
			&.quad {
				flex: 0 0 50%;
				height: 50%;
				padding: 4%;
			}
			@include mq($until: tablet) {
				display: none;
				&:first-child {
					display: block;
					flex: 1 1 100%;
					height: 100%;
				}
			}
		}
	}

	:global(.image) {
		height: 100%;
		width: 100%;
	}

	:global(.image-cover) {
		object-fit: cover !important;
	}
	:global(.image-portrait) {
		object-fit: contain;
		height: 100%;
		width: auto;
	}
	:global(.image-landscape) {
		object-fit: contain;
		width: 100%;
		height: auto;
	}
	:global(.image-margin) {
		object-fit: contain;
		padding: 10%;
		@include mq($until: tablet) {
			object-fit: cover;
			padding: 0%;
			transform: scale(200%);
		}
	}
	:global(.image-background) {
		position: absolute !important;
		top: 0;
		left: 0;
		z-index: 0;
		width: 100%;
		height: 100%;
	}
</style>
