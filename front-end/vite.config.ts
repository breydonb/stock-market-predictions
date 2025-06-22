import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => {
	const isDev = mode === 'developer'
	const isTest = mode === 'unit-test';
	const isProduction = mode === 'production';

	const globalPlugin = [
		sveltekit()
	]

	return  {
		plugins: [
			...(isDev ? [ /* developer plugins*/ ]: []),
			...(isTest? [ /* test plugins*/  ] : []),
			...(isProduction? [/*production only plugins*/] : []),
			...globalPlugin
		],
		define: {
			__APP_ENV__: JSON.stringify(mode),
			__IS_PROD__: JSON.stringify(isProduction),
			__IS_DEV__: JSON.stringify(isDev),
			__IS_TEST__ : JSON.stringify(isTest),
		},
		build: {
			minify: isProduction,
			outDir: "/dist",
		}
	}
});
	

