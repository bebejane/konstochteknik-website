<script lang="ts">
	import "$lib/styles/index.scss";
	import { currentProject } from "$lib/stores";
	$: captionStyle = $currentProject?.captionStyle;
	$: color = "inherit";
</script>

<nav class={captionStyle} style={`color:${color}`}>
	<h1>
		<a href="/" data-sveltekit-reload>Konst & Teknik</a>
		<br />
		<span><em>Selected Works</em></span>
	</h1>
	<menu>
		<a href="/about">About</a> · <a href="https://www.instagram.com/konstteknik">News</a>
	</menu>
</nav>

<div class="layout">
	<slot />
</div>

<style lang="scss">
	.layout {
		max-height: 100vh;
		height: 100vh;
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
		&.invert,
		&.fill {
			color: var(--white);
		}
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
