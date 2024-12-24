import { VercelRequest, VercelResponse } from '@vercel/node';
import { prerender } from '../src/ssr-entry';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const path = req.url || '/';

    try {
        // Await the async prerender function
        const { html } = await prerender(path);

        res.setHeader('Content-Type', 'text/html');
        res.send(`<!DOCTYPE html>${html}`);
    } catch (error) {
        console.error('Error during SSR:', error);
        res.status(500).send('Internal Server Error');
    }
}