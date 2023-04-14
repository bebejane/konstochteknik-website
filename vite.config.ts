import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'
import watchAndRun from 'vite-plugin-watch-and-run'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		sveltekit(),
		watchAndRun([
			{
				name: 'codegen',
				watchKind: ['add', 'change', 'unlink'],
				watch: path.resolve('src/**/*.gql'),
				run: 'npm run codegen',
				delay: 300
			}
		])
	]
});
