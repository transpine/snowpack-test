import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

const production = process.env.NODE_ENV === 'production';

function babelOptions(){
  return { plugins: production ? ['transform-remove-console'] : [] };
}
/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: {url: '/', static: true},
    src: {url: '/dist'},
  },
  plugins: [
    ['@snowpack/plugin-svelte', {
      preprocess: sveltePreprocess({
      // preprocess: require('svelte-preprocess')({
				scss: {
					prependData: '@import "src/scss/main.scss";',					
				},
				postcss: { 
					plugins: [ autoprefixer() ],
				},
        babel: babelOptions()
			})
    }], 
    ['@snowpack/plugin-babel', {
      transformOptions: babelOptions()
    }],
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-sass',
    '@snowpack/plugin-optimize'
  ],
  alias: {
    '~': './src'
  },
  routes: [
    /* Example: Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
