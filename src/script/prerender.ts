import fs from 'fs';
import path from 'path';
import { prerender } from "../index.tsx"

const routes = ['/', '/library', '/project'];

(async () => {
    for (const route of routes) {
        const { html, head } = await prerender({ url: route });
        const headTags = Array.from(head.elements || [])
            .map(
                (el) =>
                    `<${el.type} ${Object.entries(el.props)
                        .map(([key, value]) => `${key}="${value}"`)
                        .join(' ')} />`
            )
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

        const outputDir = path.join(__dirname, 'dist', route === '/' ? '' : route);
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(path.join(outputDir, 'index.html'), page);
    }
})();