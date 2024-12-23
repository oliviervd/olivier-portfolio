import { LocationProvider, Route , Router } from 'preact-iso';
import { h, render } from 'preact';

import {Home} from "./pages/home";

const App= () => (
    <LocationProvider>
            <Router>
                <Route path="/" component={Home} />
                <Route default component={Home} />
            </Router>
    </LocationProvider>
)

render(<App/>, document.getElementById('app'));
