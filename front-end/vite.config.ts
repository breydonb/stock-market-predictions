import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import type { ViteUserConfig } from 'vitest/config';
import { defineConfig } from 'vitest/config'

const mode = import.meta.env.VITE_ENV_MODE;

export default defineConfig(({ mode }) => {
	const isDev = mode == 'dev-mode'
	const isTest = mode == 'unit-test';
	const isProduction = mode == 'production';
	return  {
		plugins: [tailwindcss(), sveltekit()],
		define: {
			__APP_ENV__: JSON.stringify(mode),
		},
		build: {
			minify: isProduction,
			outDir: "/dist"
		}
});
	
function createPlugin(mode: string) {
	const plugins = [sveltekit(), tailwindcss()];

}



