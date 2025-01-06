import react from '@vitejs/plugin-react'
import ssr from 'vike/plugin'

const config = {
	plugins: [react(), ssr()],
	build: {
		outDir: 'dist',
	},
	server: {
		port: 5173 // Explicitly set development server port
	},
}

export default config