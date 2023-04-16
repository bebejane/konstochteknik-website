<script lang="ts">
	import Markdown from "svelte-markdown";
	export let project: ProjectRecord;
	let color = project.captionStyle === "color" ? project.color?.hex : "inherit";
</script>

<div style={`background-color:${project.color?.hex}`}>
	<slot />
	<h2 class={project.captionStyle} style={`color:${color}`}>
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
		color: var(--black);
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

			&.fill {
				background-color: rgba(255, 255, 255, 1);
			}
			&.transparent {
				background-color: transparent;
			}
			&.invert {
				color: var(--white) !important;
			}
		}
	}
</style>
