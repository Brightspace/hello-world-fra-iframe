import copy from 'rollup-plugin-copy';
import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';

// NOTE: Ideally these should all be dynamically imported by apps. These
// are included because tinyMCE dynamically requests various files that
// rollout can't discover.
const staticFiles = [
	'node_modules/@brightspace-ui/htmleditor/tinymce/**'
];

const baseConfig = createSpaConfig({
	developmentMode: false,
	injectServiceWorker: false,
});

export default merge(baseConfig, {
	input: './src/index.html',
	plugins: [
		copy({
			targets: staticFiles.map((f) => {
				return {src: f, dest: 'dist/node_modules'};
			}),
			flatten: false
		})
	]
});
