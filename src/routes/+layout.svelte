<script lang="ts">
	import "$lib/styles/index.scss";
	import { currentProject } from "$lib/stores";
	import About from "./components/About.svelte";
	let showAbout = false;
	$: color = showAbout ? "var(--white)" : $currentProject?.color?.hex;
</script>

{#key color}
	<nav style:color>
		<h1>
			<a href="/" data-sveltekit-reload>Konst & Teknik</a>
			<br />
			<span><em>Selected Works</em></span>
		</h1>
		<menu>
			<a href="/about" on:click|preventDefault={() => (showAbout = !showAbout)}>About</a> ·
			<a href="https://www.instagram.com/konstteknik">News</a>
		</menu>
	</nav>
{/key}

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
	nav {
		position: fixed;
		top: 0;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		width: 100%;
		z-index: 200;
		padding: var(--outer-margin);
		color: var(--black);
		pointer-events: none;
	}
	h1,
	menu {
		pointer-events: all;
		white-space: nowrap;
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
	}
	a {
		color: inherit;
	}
</style>
