import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	build: {
		rollupOptions: {
			input: 'src/index.tsx'
		},
		ssr: 'src/ssr-entry.ts',
	},
	ssr: {
		noExternal: ['preact', 'preact-iso']
	}
});
