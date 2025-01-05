// api/vike.js
import { createServer } from 'vite';
import { renderPage } from 'vike/server';

// Vercel handler for SSR
export default async (req, res) => {
    const url = req.url;

    const server = await createServer({
        server: { middlewareMode: true },
        appType: 'custom'
    });

    const result = await renderPage({ url });

    if (!result) {
        res.statusCode = 404;
        res.end('404 Page Not Found');
        return;
    }

    const { statusCode, headers, body } = result;
    res.writeHead(statusCode, headers);
    res.end(body);
};