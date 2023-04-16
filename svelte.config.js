import adapter from "@sveltejs/adapter-auto";
import { resolve } from "path";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$lib: "./src/lib",
			$graphql: "./src/lib/graphql",
			$fonts: resolve("./static/fonts"),
		},
	},
};

export default config;
