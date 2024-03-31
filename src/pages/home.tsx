import { render } from 'preact';
import '../style.css';
import '../style/normalize.css'
import '../style/project.css'
import Header from "../components/header";
import About from "../components/about";
import Pillar from "../sketches/pillar";
import Resume from "../components/resume";
import {useState} from "preact/hooks";
import {useEffect} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";
import Projects from "../components/projects";

export function App() {

	const [showResume, setShowResume] = useState(false)
	const [showAbout, setShowAbout] =useState(true)
	const [showProjects, setShowProjects] = useState(true)
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
		setMenuOpen(false);
		setShowProjects(false);
		if (window.innerWidth < 600) {
			setShowAbout(false)
		}
		setShowResume(true)
	}

	function toggleMenu() {
		setShowResume(false)
		setShowAbout(false)
		setMenuOpen(!menuOpen)
	}
	function toggleHome() {
		setShowAbout(true)
		setMenuOpen(false)
		setShowResume(false)
		setShowProjects(true)
	}

	return (
		<div className={'main--container'}>
			{globals[0] &&
				<Header globals={globals} menuOpen={menuOpen} toggleMenu={toggleMenu} showResume={showResume} resume={navigateToResume} toggleHome={toggleHome}/>
			}
			<div class={showAbout ? "box__half" : "box__half hidden"}>
				<About about={about}/>
			</div>
			<div class={"pillar__container"}>
				<Pillar/>
			</div>
			{showProjects &&
				<div className={"projects__container"}>
					<Projects/>
				</div>
			}
			{globals[0] &&
				<Resume globals={globals} show={showResume}></Resume>
			}

			{/*<Footer/>*/}
		</div>
	);
}

render(<App />, document.getElementById('app'));
