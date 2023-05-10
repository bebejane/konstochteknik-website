<script lang="ts">
	import "$lib/styles/index.scss";
	import { currentProject } from "$lib/stores";
	import About from "./components/About.svelte";
	export let data;

	let showAbout = false;

	function goHome() {
		$currentProject = data.allProjects[0] as ProjectRecord;
	}
	let test = "test";
	$: color = showAbout ? "var(--white)" : $currentProject?.color?.hex;
</script>

<nav style:color class="color-transition">
	{#key color}
		<h1>
			<a href="/" on:click={goHome}
				>Konst & Teknik
				<br />
				<span><em>Selected Works</em></span>
			</a>
		</h1>
		<menu>
			<a href="/about" on:click|preventDefault={() => (showAbout = !showAbout)}
				>About</a
			>
			·
			<a href="https://www.instagram.com/konstteknik">News</a>
		</menu>
	{/key}
</nav>

<div class="layout">
	<slot />
</div>

{#if showAbout}
	<About on:close={() => (showAbout = false)} />
{/if}

<style lang="scss">
	.layout {
		max-height: 100vh;
		min-height: 100vh;
		overflow: hidden;
	}
	:global(.color-transition) {
		transition: color 0.8s;
	}
	.test {
		background-color: var(--white);
	}
	nav {
		position: fixed;
		top: 0;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		width: 100%;
		z-index: 200;
		padding-left: var(--outer-margin);
		padding-right: var(--outer-margin);
		padding-top: var(--other-margin);
		color: var(--black);
		pointer-events: none;
	}
	h1,
	menu {
		pointer-events: all;
		white-space: nowrap;
		font-weight: normal;
	}
	h1 {
		flex: 1 1 100%;
		span {
			margin-left: 1rem;
		}
	}
	menu {
		padding: 0;
		margin: 0;
		text-align: right;
		line-height: var(--line-height);
	}
	a {
		color: inherit;
	}
</style>
