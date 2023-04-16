import { sveltekit } from '@sveltejs/kit/vite'
import codegen from 'vite-plugin-graphql-codegen';
import barrels from 'vite-plugin-barrels';

import { defineConfig } from 'vite'

export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@import "./src/lib/styles/_mediaqueries.scss";
					@import "./src/lib/styles/_fonts.scss";
				`
			}
		}
	},
	plugins: [
		sveltekit(),
		codegen({}),
		barrels({
			entry: './src/routes/components',
			extension: '.svelte',
		})
	]
});
