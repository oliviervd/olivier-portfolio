import { render } from 'preact';
import './style.css';
import './style/normalize.css'
import Header from "./components/header";
import About from "./components/about";
import Pillar from "./sketches/pillar";
import Resume from "./components/resume";
import {useState} from "preact/hooks";
import {useEffect} from "preact/hooks";
import {fetchPayload} from "./utils/fetchPayload";
import serialize from "./utils/serialize";

export function App() {

	const [showResume, setShowResume] = useState(false)
	const [showAbout, setShowAbout] =useState(true)
	const [menuOpen, setMenuOpen] = useState(false)
	const [about, setAbout] = useState([])
	const [globals, setGlobals] = useState([])

	useEffect(() => {
		fetchPayload("https://p01--admin--cvvgvqwlxhx2.code.run", "about", 10).then((data)=>{
			setGlobals(data.docs)
			const _unserializedText = data.docs[0]["bio"]
			const _serializedText = serialize(_unserializedText)
			setAbout(_serializedText)
		})
	}, []);

	function navigateToResume() {
		setMenuOpen(false)
		if (window.innerWidth < 600) {
			setShowAbout(false)
		}
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
		<div className={'main--container'}>
			{globals[0] &&
				<Header globals={globals} menuOpen={menuOpen} toggleMenu={toggleMenu} showResume={showResume} resume={navigateToResume} toggleAbout={toggleAbout}/>
			}
			<div class={showAbout ? "box__half" : "box__half hidden"}>
				<About about={about}/>
			</div>
			<div class={"pillar__container"}>
				<Pillar/>
			</div>
			{globals[0] &&
				<Resume globals={globals} show={showResume}></Resume>
			}

			{/*<Footer/>*/}
		</div>
	);
}

render(<App />, document.getElementById('app'));
