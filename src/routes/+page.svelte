<script lang="ts">
	import "@splidejs/splide/css/core";
	import "@splidejs/splide/css";
	import { Splide, SplideSlide } from "@splidejs/svelte-splide";
	import type { SplideProps } from "@splidejs/svelte-splide/components/Splide/Splide.svelte";
	import type { PageData } from "./$types";
	import Image from "$lib/components/Image.svelte";
	import ImageDouble from "$lib/components/ImageDouble.svelte";
	import ImageQuad from "$lib/components/ImageQuad.svelte";
	import Video from "$lib/components/Video.svelte";

	const blocks = {
		ImageRecord: Image,
		ImageDoubleRecord: ImageDouble,
		ImageQuadRecord: ImageQuad,
		VideoRecord: Video,
	};

	export let data: PageData;

	let splide: Splide;
	const options = {
		pagination: false,
		type: "fade",
		track: false,
	} as SplideProps;

	let allProjects = data.data.allProjects;

	function handleClick() {
		splide.go("+1");
	}
</script>

<Splide aria-label="Konst & Teknik" {options} bind:this={splide} on:click={handleClick}>
	{#each allProjects as { title, slide, color }}
		{@const data = slide[0]}
		<SplideSlide style={`background-color:${color?.hex}`}>
			<svelte:component this={blocks[data.__typename]} {data} />
		</SplideSlide>
	{/each}
</Splide>

<style lang="scss">
	:global(.splide__list) {
		width: 100%;
		height: 100%;
		max-height: 100vh;
		cursor: pointer;
	}
	:global(.splide__slide) {
		max-width: 100%;
		min-height: 100%;
	}
	:global(.splide__arrow) {
		background-color: transparent;
		filter: invert(1);
	}
</style>
