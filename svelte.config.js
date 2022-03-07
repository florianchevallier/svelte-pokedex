import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			prependData: `@import './src/theme/colors.scss';@import './src/theme/variables.scss';`
		},
		sourceMap: true
	}),

	kit: {
		adapter: adapter(),
		target: '#svelte',

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},

		vite: {
			resolve: {
				alias: {
					src: path.resolve('./src')
				}
			}
		}
	}
};

export default config;
