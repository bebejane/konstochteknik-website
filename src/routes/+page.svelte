<script lang="ts">
	import type { PageData } from "./$houdini";
	export let data: PageData;

	$: ({ Home } = data);
	$: ({ allCommisioners } = $Home.data || { allCommisioners: [] });
</script>

<ul>
	{#each allCommisioners as commisioner}
		<li>{commisioner.name}</li>
	{/each}
</ul>
