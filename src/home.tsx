import { render } from 'preact';
import './style.css';
import Header from "./components/header";
import Footer from "./components/footer"
import About from "./components/about";

export function App() {
	return (
		<div>
			<Header/>
			<div class={"box__small"}>
				<p>IS CURRENTLY MIGRATING FROM ONE CLOUD TO ANOTHER.</p>
				<About/>
			</div>
			<Footer/>
		</div>
	);
}

render(<App />, document.getElementById('app'));
