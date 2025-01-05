import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'

const config = {
	plugins: [react(), vike()],
	server: {
		port: 5173 // Explicitly set development server port
	},
}

export default config