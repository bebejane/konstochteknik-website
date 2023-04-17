<script lang="ts">
	import Page from "./[slug]/+page.svelte";
	export let data;
	let allProjects = data.allProjects.sort((a, b) => (a > b ? 1 : -1));
	let project = allProjects[0] as ProjectRecord;
</script>

{#if project}
	<Page {data} slug={project.slug} />
{/if}
