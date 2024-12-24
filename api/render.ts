import { prerender } from '../src/index';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const url = req.url || '/';
        const { html, head } = await prerender({ url });
        const headTags = Array.from(head.elements || [])
            .map((el) => `<${el.type} ${Object.entries(el.props).map(([key, value]) => `${key}="${value}"`).join(' ')} />`)
            .join('');
        const page = `
      <!DOCTYPE html>
      <html lang="${head.lang || 'en'}">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${head.title}</title>
          <meta name="description" content="${head.description}">
          ${headTags}
        </head>
        <body>
          <div id="app">${html}</div>
        </body>
      </html>
    `;
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(page);
    } catch (e) {
        console.error(e);
        res.status(500).send('Error rendering page.');
    }
}