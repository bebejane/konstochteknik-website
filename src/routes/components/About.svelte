<script lang="ts">
	import { fly, fade, scale } from "svelte/transition";
	import {
		cubicIn,
		cubicOut,
		cubicInOut,
		expoInOut,
		elasticInOut,
		quadInOut as defaultEasing,
	} from "svelte/easing";
	import type { EasingFunction, TransitionConfig } from "svelte/transition";

	let bricks = 200;

	type Params = {
		delay?: number;
		duration?: number;
		easing?: EasingFunction;
		index?: number;
	};
	type Options = {
		direction?: "in" | "out" | "both";
	};

	function cube(
		node: Element,
		{ delay = 0, duration = 1000, easing = defaultEasing, index = -1 }: Params = {},
		{ direction = "both" }: Options = {}
	): TransitionConfig {
		const even = index % 2 === 0;
		return {
			delay,
			duration,
			easing,
			css: (t) => `
        opacity: ${t > index / bricks ? 1 : 0};
        transform: 
          perspective(100px) 
          rotate${even ? "Y" : "X"}(-${t * 180}deg) 
          ${even ? `scale${even ? "Y" : "X"}(${t})` : ""}
          `,
		};
	}
</script>

<div id="about">
	<content in:fade={{ delay: 600 }} out:fade={{ duration: 200 }}>
		<p>
			Konst & Teknik is a digital design studio based in Stockholm, founded in 2006 by Mattias
			Jakobsson and <a href="https://harald.peter.stream">Peter Ström</a>.
		</p>
		<p>
			The studio works within a wide range of projects, often in the intersection of on- and
			offline, for both commercial and cultural commissioners. We design books, visual identities,
			typefaces, and develop websites, digital products and services. We also teach, give lectures
			and host events — on our own, or in close collaboration with fellow specialists.
		</p>
		<p>
			If you are interested in a collaboration, please contact us at <a
				href="mailto:info@konst-teknik.se"><em>info@konst-teknik.se</em></a
			>.
		</p>
		<p>Or reach out to one of us directly:</p>

		<div>
			<div>
				<p>
					Mattias Jakobsson<br />
					<a href="mailto:mattias@konst-teknik.se"><em>mattias@konst-teknik.se</em></a><br />
					+46 702 644 238
				</p>
			</div>
			<div class="half contact">
				<p class="space-before">
					<a href="http://www.haraldpeter.se" target="_blank">Peter Ström</a><br />
					<a href="mailto:peter@konst-teknik.se"><em>peter@kon.st</em></a><br />
					+46 706 531 175
				</p>
			</div>
		</div>

		<p>
			Visitors and post are welcome to Konst & Teknik, <a
				href="http://www.rutgerfuchsgatan9.se"
				target="_blank">Rutger Fuchsgatan 9</a
			>, 11667 Stockholm, Sweden
		</p>
	</content>
	<div id="about-bg">
		{#each new Array(bricks) as _, i (i)}
			<div
				class="about-bg-item"
				in:cube={{ index: i, duration: 1000 }}
				out:cube={{ index: i, duration: 500 }}
				style:margin={`${Math.random() * 1}px`}
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	#about {
		//animation: backdrop 1s ease-in-out forwards;
		@keyframes backdrop {
			from {
				backdrop-filter: grayscale(0) brightness(1);
			}
			to {
				backdrop-filter: grayscale(0.5) brightness(0.6);
			}
		}
	}
	#about,
	#about-bg,
	content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
	}
	#about-bg {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		overflow: hidden;
		.about-bg-item {
			background-color: var(--black);
			flex: 1 1 5%;
			border: 2px solid transparent;
		}
	}
	content {
		padding: var(--outer-margin);
		padding-top: calc(var(--outer-margin) * 4);
		color: var(--white) !important;
		z-index: 101;
		a {
			color: var(--white);
		}
	}
</style>
