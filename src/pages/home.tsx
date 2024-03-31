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
import CalculateSize from "../components/fetchSize";

export function App() {

	const [showResume, setShowResume] = useState(false)
	const [showAbout, setShowAbout] =useState(true)
	const [showProjects, setShowProjects] = useState(true)
	const [menuOpen, setMenuOpen] = useState(false)
	const [about, setAbout] = useState([])
	const [globals, setGlobals] = useState([])
	const [var1, setVar1] = useState(Math.floor(Math.random() * 10))

	console.log(var1)

	useEffect(() => {
		fetchPayload("https://p01--admin--cvvgvqwlxhx2.code.run", "about", 10).then((data)=>{
			setGlobals(data.docs)
			const _unserializedText = data.docs[0]["bio"]
			const _serializedText = serialize(_unserializedText)
			setAbout(_serializedText)
		})
	}, []);

	useEffect(() => {
		cycle(); // Call cycle() when component mounts
	}, []);

	function navigateToResume() {
		setMenuOpen(false);
		setShowProjects(false);
		if (window.innerWidth < 600) {
			setShowAbout(false)
		}
		setShowResume(true)
		cycle();
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
		cycle();
	}

	function cycle() {
		setVar1(Math.floor(Math.random() * 10))
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
				<Pillar var1={var1}/>
			</div>
			{showProjects &&
				<div className={"projects__container"}>
					<Projects/>
				</div>
			}
			{globals[0] &&
				<Resume globals={globals} show={showResume}></Resume>
			}
			<CalculateSize/>
		</div>
	);
}

render(<App />, document.getElementById('app'));
