import { render } from 'preact';
import './style.css';
import Header from "./components/header";
import Footer from "./components/footer"
import About from "./components/about";
import Pillar from "./sketches/pillar";

export function App() {
	return (
		<div>
			<Header/>
			<div class={"box__small"}>
				<About/>
			</div>
			<div class={"pillar__container"}>
				<Pillar/>
			</div>
			<Footer/>
		</div>
	);
}

render(<App />, document.getElementById('app'));
