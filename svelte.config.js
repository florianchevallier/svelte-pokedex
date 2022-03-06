import preprocess from 'svelte-preprocess';
import path from 'path';
import netlify from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			prependData: `@import './src/theme/colors.scss';@import './src/theme/variables.scss';`
		},
		sourceMap: true
	}),

	kit: {
		adapter: netlify(),

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
