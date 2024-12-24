import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	build: {
		ssr: 'src/ssr-entry.ts', // Specify the SSR entry point
		outDir: 'dist'
	},
	server: {
		port: 3000
	}
});
