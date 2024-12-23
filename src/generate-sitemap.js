import { SitemapStream, streamToPromise } from 'sitemap'; // Import sitemap tools
import { createWriteStream } from 'node:fs'; // Import `createWriteStream` from `fs`
import { writeFile } from 'node:fs/promises'; // Import `writeFile` for asynchronous file writing

const baseUrl = 'https://example.com';

// Define your static and dynamic routes
const staticRoutes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/project', changefreq: 'weekly', priority: 0.8 },
];

const dynamicRoutes = [
    { url: '/project/1', changefreq: 'weekly', priority: 0.8 },
    { url: '/project/2', changefreq: 'weekly', priority: 0.8 },
];

(async () => {
    try {
        // Generate the sitemap
        const sitemap = new SitemapStream({ hostname: baseUrl });

        // OPTIONAL: You can also write directly to a stream if needed
        const writableStream = createWriteStream('./public/sitemap.xml');

        [...staticRoutes, ...dynamicRoutes].forEach((route) => sitemap.write(route));

        sitemap.end();

        // Write sitemap to file
        const sitemapData = await streamToPromise(sitemap);
        await writeFile('./public/sitemap.xml', sitemapData.toString());

        console.log('✅ Sitemap generated at ./public/sitemap.xml');
    } catch (err) {
        console.error('❌ Failed to generate sitemap:', err);
    }
})();