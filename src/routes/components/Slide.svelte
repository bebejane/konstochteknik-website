<script lang="ts">
	import Markdown from "svelte-markdown";
	export let project: ProjectRecord;
</script>

<div style:background-color={project?.background?.hex}>
	<slot />
	<h2 class={`${project.captionStyle} caption color-transition`} style:color={project?.color?.hex}>
		<Markdown source={project.caption} isInline={true} />
	</h2>
</div>

<style lang="scss">
	div {
		position: relative;
		height: 100%;
		width: 100%;
		max-height: 100vh;
		max-width: 100vw;

		h2 {
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			margin-bottom: 1rem;
			padding: 1rem;
			line-height: 0.5;
			border-radius: 3rem;
			white-space: nowrap;
			color: var(--black);
			z-index: 10;

			&.fill {
				background-color: var(--white);
				color: var(--black) !important;
			}

			&.transparent {
				background-color: transparent;
			}
		}
	}
	:global(.caption a) {
		color: inherit !important;
	}
</style>
