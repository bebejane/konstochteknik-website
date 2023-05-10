<script lang="ts">
	import Markdown from "svelte-markdown";
	export let project: ProjectRecord;
</script>

<div style:background-color={project?.background?.hex}>
	<slot />
	<h2
		class={`${project.captionStyle} caption color-transition`}
		style:color={project?.color?.hex}
	>
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
			margin-bottom: calc(1.5 * var(--other-margin));
			padding-left: 1rem;
			padding-right: 1rem;
			padding-top: 0.8rem;
			padding-bottom: 0rem;
			line-height: 1;
			border-radius: 3rem;
			color: var(--black);
			z-index: 10;
			text-align: center;
			@include mq($from: tablet) {
				white-space: nowrap;
			}
			@include mq($until: tablet) {
				line-height: calc(0.9 * var(--line-height));
				border-radius: 1rem;
				width: 100%;
			}

			&.fill {
				background-color: var(--white);
				color: var(--black) !important;
				padding-bottom: 0.7rem;
				//width: auto;
				max-width: calc(100% - (2 * var(--other-margin)));
				margin-right: var(--other-margin);
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
