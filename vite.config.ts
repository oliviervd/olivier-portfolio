import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig(({ command, mode }) => {
	if (command === 'build' && mode === 'ssr') {
		// SSR Build (server-side only)
		return {
			plugins: [preact()],
			build: {
				ssr: 'src/ssr-entry.ts', // Server-side entry point
				outDir: 'dist-ssr'          // Output SSR build to a separate folder
			}
		};
	}

	// Default client build (for hydration)
	return {
		plugins: [preact()],
		build: {
			outDir: 'dist',               // Output static assets to dist/
		}
	};
});