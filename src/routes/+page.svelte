<script lang="ts">
	import "@splidejs/splide/css/core";
	import "@splidejs/splide/css";
	import { Splide, SplideSlide } from "@splidejs/svelte-splide";
	import type { SplideProps } from "@splidejs/svelte-splide/components/Splide/Splide.svelte";
	import Image from "$lib/components/Image.svelte";
	import ImageDouble from "$lib/components/ImageDouble.svelte";
	import ImageQuad from "$lib/components/ImageQuad.svelte";
	import Video from "$lib/components/Video.svelte";
	export let data;

	let splide: Splide;
	const blocks = {
		ImageRecord: Image,
		ImageDoubleRecord: ImageDouble,
		ImageQuadRecord: ImageQuad,
		VideoRecord: Video,
	};

	const options = {
		pagination: false,
		type: "fade",
		track: false,
	} as SplideProps;

	let { allProjects } = data;
	let index: number = 0;

	function handleClick() {
		splide.go("+1");
	}
</script>

<Splide
	aria-label="Konst & Teknik"
	bind:this={splide}
	on:click={handleClick}
	on:move={(e) => e && (index = e.detail.index)}
	{options}
>
	{#each allProjects as { title, slide, color }, idx}
		{@const data = slide[0]}
		{#key index}
			<SplideSlide style={`background-color:${color?.hex}`}>
				<svelte:component this={blocks[data.__typename]} {data} active={idx === index} />
			</SplideSlide>
		{/key}
	{/each}
</Splide>

<button class="prev" on:click={() => splide.go("-1")} />
<button class="next" on:click={() => splide.go("+1")} />

<svelte:window
	on:keydown={({ key }) => key === "ArrowLeft" && splide.go("-1")}
	on:keydown={({ key }) => key === "ArrowRight" && splide.go("+1")}
/>

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
	.prev,
	.next {
		position: fixed;
		top: 0;
		height: 100%;
		width: 10%;
		z-index: 100;
		background-color: transparent;
		border: 0;
		cursor: pointer;
		outline: none;
	}
	.prev {
		left: 0;
	}
	.next {
		right: 0;
	}
</style>
