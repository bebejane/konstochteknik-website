<script lang="ts">
	import { Image } from "@datocms/svelte";
	export let data: any;

	let { images } = data as ImageQuadRecord;
</script>

{#if images.length === 4}
	<ul>
		{#each images as image}
			{#if image.responsiveImage}
				<li>
					<Image
						data={image.responsiveImage}
						fadeInDuration={0}
						class="image-quad-wrapper"
						pictureClass="image-quad"
						objectFit="contain"
						lazyLoad={true}
					/>
				</li>
			{/if}
		{/each}
		<li>
			<Image
				data={data.imageMobile.responsiveImage}
				fadeInDuration={0}
				class="image-mobile-wrapper"
				pictureClass="image-quad-mobile"
				objectFit="contain"
				lazyLoad={true}
			/>
		</li>
	</ul>
{:else}
	<p>Image double block</p>
{/if}

<style lang="scss">
	ul {
		position: relative;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		li {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 50%;
			height: 50%;
			flex: 0 0 50%;
			padding: 4%;
			&:last-child {
				display: none;
				width: 100%;
				height: 100%;
				flex: 0 0 100%;
			}
			@include mq($until: tablet) {
				display: none;
				&:last-child {
					display: flex;
				}
			}
		}
	}
	:global(.image-quad-wrapper) {
		max-height: 100%;
	}
	:global(.image-quad) {
		object-fit: contain;
	}
</style>
