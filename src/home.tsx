import { render } from 'preact';
import './style.css';
import Header from "./components/header";

export function App() {
	return (
		<div>
			<Header/>
		</div>
	);
}

render(<App />, document.getElementById('app'));
