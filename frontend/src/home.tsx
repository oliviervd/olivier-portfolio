import { render } from 'preact';
import './style.css';
import Header from "./components/header";
import Footer from "./components/footer"

export function App() {
	return (
		<div>
			<Header/>
			<div class={"box__small"}>
				<p>IS CURRENTLY MIGRATING FROM ONE CLOUD TO ANOTHER.</p>
				<p>Olivier Van D'huynslager is a Belgian curator and strategist based in Ghent, Belgium. Currently active as curator of digital culture and design at Design Museum Gent. Aside, he is a freelance musician and coder, mainly working on web-design.</p>
			</div>
			<Footer/>
		</div>
	);
}

render(<App />, document.getElementById('app'));
