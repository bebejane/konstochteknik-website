<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import type { PageData } from "./$types";
	import Image from "$lib/components/Image.svelte";
	import ImageDouble from "$lib/components/ImageDouble.svelte";
	import ImageQuad from "$lib/components/ImageQuad.svelte";
	import Video from "$lib/components/Video.svelte";

	export let data: PageData;

	const blocks = {
		ImageRecord: Image,
		ImageDoubleRecord: ImageDouble,
		ImageQuadRecord: ImageQuad,
		VideoRecord: Video,
	};

	let allProjects = data.data.home.allProjects;
	let slug = $page.params.slug;
	let index = allProjects.findIndex((el) => el.slug === slug);
	let project = allProjects[index];
	let slide = project?.slide[0];
	let blockType = project?.slide[0].__typename;

	let next = index < allProjects.length - 1 ? `/projects/${allProjects?.[index + 1]?.slug}` : null;
	let prev = index > 0 ? `/projects/${allProjects?.[index - 1]?.slug}` : null;
</script>

{#key slug}
	{#if blockType && slide}
		<svelte:component this={blocks[blockType]} data={slide} active={false} />
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
	}
	.prev {
		left: 0;
	}
	.next {
		right: 0;
	}
</style>
