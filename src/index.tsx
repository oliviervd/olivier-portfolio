import { LocationProvider, Route , Router } from 'preact-iso';
import { h, render } from 'preact';

import {Home} from "./pages/home";
import {Project} from "./pages/project";

const App= () => (
    <LocationProvider>
            <Router>
                <Route path="/" component={Home} />
                <Route path="/project/:id?" component={Project} />
            </Router>
    </LocationProvider>
)

render(<App/>, document.getElementById('app'));
