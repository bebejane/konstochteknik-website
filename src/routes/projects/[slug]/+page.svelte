<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { currentProject } from "$lib/stores";

	import Slide from "../../components/Slide.svelte";
	import ImageSlide from "../../components/ImageSlide.svelte";
	import VideoSlide from "../../components/VideoSlide.svelte";

	export let data;

	let { allProjects } = data;

	const blocks = {
		ImageSlideRecord: ImageSlide,
		VideoSlideRecord: VideoSlide,
	};

	let slug = $page.params.slug;
	let index = allProjects.findIndex((el) => el.slug === slug);
	let project = allProjects[index] as ProjectRecord;
	let slide = project?.slide[0];
	let blockType = slide.__typename;
	let next = index < allProjects.length - 1 ? `/projects/${allProjects?.[index + 1]?.slug}` : null;
	let prev = index > 0 ? `/projects/${allProjects?.[index - 1]?.slug}` : null;
	$: $currentProject = project;
</script>

{#key slug}
	{#if blockType && slide}
		<Slide {project}>
			<svelte:component this={blocks[blockType]} data={slide} active={true} />
		</Slide>
	{/if}
	<a href={prev} class="prev">&nbsp;</a>
	<a href={next} class="next">&nbsp;</a>
{/key}

<svelte:window
	on:keydown={({ key }) => key === "ArrowLeft" && prev && goto(prev)}
	on:keydown={({ key }) => key === "ArrowRight" && next && goto(next)}
/>

<style lang="scss">
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
