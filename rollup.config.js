import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';

const baseConfig = createSpaConfig({
	developmentMode: false,
	injectServiceWorker: false,
});

export default merge(baseConfig, {
	input: './src/index.html'
});