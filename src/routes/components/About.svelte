<script lang="ts">
	import { page } from "$app/stores";
	import { Image } from "@datocms/svelte";
	import Markdown from "svelte-markdown";

	let about = $page.data.about;
</script>

<div id="about">
	<Image data={about.image.responsiveImage} />
	<div id="content">
		<Markdown source={about.intro} isInline={true} />
		<p>Or reach out to one of us directly:</p>
		<p>
			Mattias Jakobsson<br />
			<a href="mailto:mattias@konst-teknik.se"><em>mattias@konst-teknik.se</em></a><br />
			+46 702 644 238
		</p>
		<p>
			<a href="http://www.haraldpeter.se" target="_blank">Peter Ström</a><br />
			<a href="mailto:peter@konst-teknik.se"><em>peter@kon.st</em></a><br />
			+46 706 531 175
		</p>
		<p>
			Visitors and post are welcome to Konst & Teknik, <a
				href="http://www.rutgerfuchsgatan9.se"
				target="_blank"
				rel="noreferrer">Rutger Fuchsgatan 9</a
			>, 11667 Stockholm, Sweden
		</p>
		<h3>A selection of our commissioners</h3>
		<br />
		<ul>
			{#each $page.data.allCommisioners as commisioner}
				<li>{commisioner.name}</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="scss">
	#about {
		position: fixed;
		display: flex;
		flex-direction: row;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: var(--z-index-about);
		background-color: var(--black);

		> div {
			flex: 0 0 50%;
		}
		#content {
			padding: var(--outer-margin);
			padding-top: calc(var(--outer-margin) * 2);
			color: var(--white) !important;
			z-index: 101;
			max-height: 100vh;
			overflow-y: scroll;
			a {
				color: var(--white) !important;
			}
			> div {
				flex: 0 0 50%;
			}
			ul {
				list-style: none;
				column-count: 2;
			}
		}
	}

	:global(#content a) {
		color: var(--white) !important;
	}
</style>
