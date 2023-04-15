import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'
//import watchAndRun from 'vite-plugin-watch-and-run'
import codegen from 'vite-plugin-graphql-codegen';
import barrels from 'vite-plugin-barrels';

import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		sveltekit(),
		codegen({}),
		barrels({
			entry: './src/lib/components',
			extension: '.svelte',
		})
	]
});
