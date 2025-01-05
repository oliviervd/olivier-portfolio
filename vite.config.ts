import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'

const config = {
	plugins: [react(), vike()],
	base: '/',
	build: {
		outDir: 'dist',
	},
	ssr: {
		target: 'node',
		noExternal: [
			// Add any server-side dependencies here if needed
	]},
	server: {
		port: 5173 // Explicitly set development server port
	},
}

export default config