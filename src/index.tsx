import { LocationProvider, Route , Router, hydrate, prerender as ssr } from 'preact-iso';
import { h } from 'preact';

import {Home} from "./pages/home";
import {Project} from "./pages/project";

function App({url}:{url:string})  {
    return(
        <LocationProvider>
            <Router>
                <Route path="/" component={Home} />
                <Route path="/project/:id?" component={Project} />
            </Router>
        </LocationProvider>
    )
}


// use hydrate instead of render to enable SSR. (SEO improvements).
if (typeof window !== 'undefined') {
    hydrate(<App url={window.location.href}/>, document.getElementById('app'));
}

export async function prerender(data) {
    const html = ssr(<App url={data.url} />);
    return {
        html,
        head: {
            title: "'Olivier Van D'huynslager - homepage",
            description: "Olivier Van D'huynslager's homepage",
            lang: 'en',
            elements: new Set([
                // Social media meta tags.
                { type: 'meta', props: { property: 'og:title', content: "Olivier Van D'huynslager - homepage" } },
                { type: 'meta', props: { property: 'og:description', content: "Olivier Van D'huynslager's homepage" } },
                { type: 'meta', props: { property: 'og:url', content: "https://oliviervandhuynslager.net" } },
                { type: 'meta', props: { property: 'og:image', content: "https://d3b71b8mgnztvw.cloudfront.net/headshot-dither" } },
                { type: 'meta', props: { property: 'og:type', content: "website" } },
            ])
        }
    };
}

//render(<App/>, document.getElementById('app'));
