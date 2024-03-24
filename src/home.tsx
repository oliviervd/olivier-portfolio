import { render } from 'preact';
import './style.css';
import './style/normalize.css'
import Header from "./components/header";
import Footer from "./components/footer"
import About from "./components/about";
import Pillar from "./sketches/pillar";
import Resume from "./components/resume";
import {useState} from "preact/hooks";

export function App() {

	const [showResume, setShowResume] = useState(false)
	const [showAbout, setShowAbout] =useState(true)
	const [menuOpen, setMenuOpen] = useState(false)

	function navigateToResume() {
		setMenuOpen(false)
		setShowAbout(false)
		setShowResume(!showResume)
	}

	function toggleMenu() {
		setShowResume(false)
		setShowAbout(false)
		setMenuOpen(!menuOpen)
	}
	function toggleAbout() {
		setShowAbout(true)
		setMenuOpen(false)
	}

	return (
		<div>
			<Header menuOpen={menuOpen} toggleMenu={toggleMenu} showResume={showResume} resume={navigateToResume} toggleAbout={toggleAbout}/>
			<div class={showAbout ? "box__small" : "box__small hidden"}>
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
