<script lang="ts">
	export let data;
	let allProjects = data.allProjects.sort((a, b) => (a > b ? 1 : -1));
</script>

{#each allProjects as project}
	<h1><a href={`/projects/${project.slug}`}>{project.title}</a></h1>
{/each}
