import { LocationProvider, Route , Router, hydrate, prerender as ssr } from 'preact-iso';
import { h } from 'preact';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Home} from "./pages/home";
import {Project} from "./pages/project";
import {Library} from "./pages/library";

const queryClient = new QueryClient();

function App({url}:{url:string})  {
    return(
        <QueryClientProvider client={queryClient}>
            <LocationProvider>
                <Router>
                    <Route path="/" component={Home} />
                    <Route path="/project/:id?" component={Project} />
                    <Route path="/library" component={Library} />
                </Router>
            </LocationProvider>
        </QueryClientProvider>
    )
}


// use hydrate instead of render to enable SSR. (SEO improvements).
if (typeof window !== 'undefined') {
    hydrate(<App url={window.location.href}/>, document.getElementById('app'));
}

export async function prerender(data) {

    // routes to prerender
    const routesToPrerender = ["/", "/project", "/library"];

    // SSR
    if (routesToPrerender.includes(data.url)) {
        // dynamic metadata for each route;
        let title = "";
        let description = "";
        let url = `https://oliviervandhuynslager.net${data.url}`

        // custom metadata and titles based on route

        switch (data.url) {
            case '/':
                title = "Olivier Van D'huynslager - Homepage";
                description = "Discover Olivier Van D'huynslager's homepage and personal projects.";
                break;
            case '/project':
                title = "Projects - Olivier Van D'huynslager";
                description = "Projects by Olivier Van D'huynslager.";
                break;
            case '/library':
                title = "Library - Olivier Van D'huynslager";
                description = "Personal library (index) of Books of Olivier Van D'huynslager.";
                break;
            default:
                title = "Olivier Van D'huynslager";
                description = "Visit Olivier Van D'huynslager's website.";
        }

        const html = ssr(
            <QueryClientProvider client={queryClient}>
                <App url={data.url} />
            </QueryClientProvider>
        );
        // HTML
        return {
            html,
            head: {
                title: title,
                description: description,
                lang: 'en',
                elements: new Set([
                    // Social media meta tags.
                    { type: 'meta', props: { property: 'og:title', content: title } },
                    { type: 'meta', props: { property: 'og:description', content: description } },
                    { type: 'meta', props: { property: 'og:url', content: url } },
                    { type: 'meta', props: { property: 'og:image', content: "https://d3b71b8mgnztvw.cloudfront.net/headshot-dither" } },
                    { type: 'meta', props: { property: 'og:type', content: "website" } },
                ])
            }
        };
    }
    // Fallback for other routes (if needed)
    return {
        html: "",
        head: {
            title: "Page Not Found",
            description: "This page does not exist.",
            lang: 'en',
        },
    };

}

//render(<App/>, document.getElementById('app'));
