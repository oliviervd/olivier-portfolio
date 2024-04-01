import { render } from 'preact';
import '../style.css';
import '../style/normalize.css'
import '../style/project.css'
import '../style/music.css'
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
	const [type, setType] = useState("home")
	const [showProjects, setShowProjects] = useState(true)
	const [showMusic, setShowMusic] =useState(false);
	const [showCuratorial, setShowCuratorial] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false)
	const [music, setMusic] = useState([])
	const [about, setAbout] = useState([])
	const [pages, setPages] = useState([])
	const [globals, setGlobals] = useState([])
	const [var1, setVar1] = useState(Math.floor(Math.random() * 10))

	useEffect(() => {
		fetchPayload("https://p01--admin--cvvgvqwlxhx2.code.run", "about", 10).then((data)=>{
			setGlobals(data.docs)
			setAbout(serialize(data.docs[0]["bio"]))
		})
		fetchPayload("https://p01--admin--cvvgvqwlxhx2.code.run", "page", 10).then((data)=>{
			setPages(data.docs)
		})
		fetchPayload("https://p01--admin--cvvgvqwlxhx2.code.run", "music", 10).then((data)=>{
			setMusic(data.docs)
		})
	}, []);

	useEffect(() => {
		cycle(); // Call cycle() when component mounts
	}, []);

	function cycle() {
		setVar1(Math.floor(Math.random() * 10))
	}
	function toggleComponent(componentName) {
		setType(componentName)
		setShowResume(componentName === "resume")
		setShowMusic(componentName === "music")
		setShowProjects(componentName === "home")
		setShowCuratorial(componentName === "curatorial")
		if (window.innerWidth < 600) {
			setShowAbout(false)
		}
	}

	return (
		<div className={'main--container'}>
			{globals[0] &&
				<Header globals={globals} menuOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} toggleComponent={toggleComponent}/>
			}
			<div class={showAbout ? "box__half" : "box__half hidden"}>
				<About about={about}/>
			</div>
			<div class={"pillar__container"}>
				<Pillar var1={var1}/>
			</div>
			{!showResume &&
				<div className={"projects__container"}>
					<Projects pages={pages} type={type} music={music}/>
				</div>
			}
			{globals[0] &&
				<Resume globals={globals} show={showResume}></Resume>
			}
			<CalculateSize/>
		</div>
	);
}

render(<App/>, document.getElementById('app'));
