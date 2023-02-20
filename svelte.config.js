// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$assets: 'src/assets',
			$actions: 'src/lib/actions',
			// $helpers: 'src/lib/helpers',
			$stores: 'src/lib/stores'
		},
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/groove-score' : '',
		},
	}
};

export default config;
