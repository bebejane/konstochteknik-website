<script lang="ts">
	import type { PageData } from "./$types";
	import Block from "$lib/components/blocks/Block.svelte";

	export let data: PageData;
	let allProjects = data.data.allProjects;
</script>

<ul>
	{#each allProjects as project}
		<li style:background-color={project.color?.hex}>
			<Block data={project} />
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		display: flex;
		flex-direction: row;
		overflow-x: scroll;
		max-height: 100vh;
		li {
			min-height: 100%;
			min-width: 100%;
			max-height: 100%;
			max-width: 100vw;
		}
	}
</style>
