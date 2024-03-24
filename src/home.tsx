import { render } from 'preact';
import './style.css';
import Header from "./components/header";
import Footer from "./components/footer"
import About from "./components/about";
import Pillar from "./sketches/pillar";
import Resume from "./components/resume";
import {useState} from "preact/hooks";

export function App() {

	const [showResume, setShowResume] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<div>
			<Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} showResume={showResume} setShowResume={setShowResume}/>
			<div class={!menuOpen ? "box__small" : "box__small hidden"}>
				<About/>
			</div>
			<div class={"pillar__container"}>
				<Pillar/>
			</div>
			<Resume show={showResume}></Resume>
			<Footer/>
		</div>
	);
}

render(<App />, document.getElementById('app'));
