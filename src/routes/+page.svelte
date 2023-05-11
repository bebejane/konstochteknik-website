<script lang="ts">
	import "@splidejs/splide/css/core";
	import "@splidejs/splide/css";
	import { Splide, SplideSlide } from "@splidejs/svelte-splide";
	import type { SplideProps } from "@splidejs/svelte-splide/components/Splide/Splide.svelte";
	import { currentProject } from "$lib/stores";
	import { Slide, ImageSlide, VideoSlide } from "./components";
	import { hoverAction, mediaQuery } from "svelte-legos";

	export let data;

	let splide: Splide;

	const isMobile = mediaQuery("(max-width: 768px)");

	const blocks = {
		ImageSlideRecord: ImageSlide,
		VideoSlideRecord: VideoSlide,
	};

	let allProjects = data.allProjects as ProjectRecord[];
	let index: number = 0;
	let showNavigation: string | null = null;

	const options = {
		pagination: false,
		type: $isMobile ? "slide" : "fade",
		track: false,
		rewind: true,
		rewindSpeed: 0,
	} as SplideProps;

	function handleClick() {
		splide.go("+1");
	}

	function handleNavigationHover(e: CustomEvent<{ hover: boolean }>) {
		const target = e.target as HTMLElement;
		showNavigation = e.detail.hover ? target.id : null;
	}

	$: $currentProject = allProjects[index];
	$: splide?.go(allProjects.findIndex((el) => el.id === $currentProject?.id));
</script>

<Splide
	aria-label="Konst & Teknik"
	bind:this={splide}
	on:click={handleClick}
	on:move={(e) => e && (index = e.detail.index)}
	{options}
>
	{#each allProjects as project, idx}
		{@const data = project.slide[0]}
		{#if data.__typename}
			<SplideSlide style={`background-color:${project.color?.hex}`}>
				<Slide {project} active={idx === index}>
					<svelte:component this={blocks[data.__typename]} {data} active={idx === index} />
				</Slide>
			</SplideSlide>
		{/if}
	{/each}
</Splide>

<button
	id="prev"
	class:show={showNavigation === "prev"}
	use:hoverAction
	on:hover={handleNavigationHover}
	on:click={() => splide.go("-1")}
	style:color={allProjects[index].color?.hex}>←</button
>
<button
	id="next"
	class:show={showNavigation === "next"}
	use:hoverAction
	on:hover={handleNavigationHover}
	on:click={() => splide.go("+1")}
	style:color={allProjects[index].color?.hex}>→</button
>

<svelte:window
	on:keydown={({ key }) => key === "ArrowLeft" && splide.go("-1")}
	on:keydown={({ key }) => key === "ArrowRight" && splide.go("+1")}
/>

<style lang="scss">
	:global(.splide__list) {
		position: relative;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100dvh;
		cursor: pointer;
	}
	:global(.splide__slide) {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		@include mq($until: tablet) {
			position: relative;
		}
	}
	:global(.splide__arrow) {
		display: none;
	}
	#prev,
	#next {
		position: fixed;
		top: 0;
		height: 100%;
		width: 10%;
		z-index: 100;
		background-color: transparent;
		border: 0;
		cursor: pointer;
		outline: none;
		color: var(--white);
		font-size: 3rem;
		opacity: 0;
		&.show {
			opacity: 1;
		}
		@include mq($until: desktop) {
			display: none;
		}
	}
	#prev {
		left: 0;
	}
	#next {
		right: 0;
	}
</style>
