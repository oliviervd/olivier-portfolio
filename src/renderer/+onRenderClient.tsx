import React, {StrictMode} from 'react';
import { hydrateRoot } from 'react-dom/client';
import { PageShell } from './PageShell';
import {PageContextClient} from "vike/dist/esm/shared/types";

export {onRenderClient}

async function onRenderClient(pageContext: PageContextClient)  {
    const { Page } = pageContext;

    hydrateRoot(
        document.getElementById('app')!,
        <StrictMode>
            <PageShell>
                <Page />
            </PageShell>
        </StrictMode>
    );
};