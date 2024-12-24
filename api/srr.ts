import { VercelRequest, VercelResponse } from '@vercel/node';
import path from 'path';

// Import SSR logic from the SSR build output
const { prerender } = require(path.resolve(__dirname, '../dist-ssr/ssr-entry.js'));

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const url = req.url || '/';

    try {
        // Await the rendered HTML
        const { html } = await prerender(url);
        res.setHeader('Content-Type', 'text/html');
        res.send(`<!DOCTYPE html>${html}`);
    } catch (error) {
        console.error('SSR Error:', error);
        res.status(500).send('Internal Server Error');
    }
}