import React from 'react';
import { renderToString } from 'react-dom/server';
import { PageShell } from './PageShell';
import {PageContextServer} from "vike/dist/esm/shared/types";
import { escapeInject, dangerouslySkipEscape } from 'vike/server'

export { onRenderHtml }

async function onRenderHtml(pageContext: PageContextServer) {
    const {Page, pageProps} = pageContext;

    const pageHtml = renderToString(
        <PageShell>
            <Page {...pageProps} />
        </PageShell>
    );

    const documentHtml =  escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="description" content="${dangerouslySkipEscape(pageContext.documentProps?.description || '')}" />
        <meta property="og:title" content="${dangerouslySkipEscape(pageContext.documentProps?.title || '')}" />
        <meta property="og:description" content="${dangerouslySkipEscape(pageContext.documentProps?.description || '')}" />
        <title>${dangerouslySkipEscape(pageContext.documentProps?.title || '')}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

    return {
        documentHtml,
        pageContext: {}
    }
}