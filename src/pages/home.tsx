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
	const [menuOpen, setMenuOpen] = useState(false)
	const [scrollToID, setScrollToID] = useState(null)

	const [resume, setResume] = useState([])
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
		fetchPayload("https://p01--admin--cvvgvqwlxhx2.code.run", "resume", 10).then((data)=>{
			setResume(data.docs[0])
		})
	}, []);

	useEffect(() => {
		cycle(); // Call cycle() when component mounts
	}, []);

	function cycle() {
		setVar1(Math.floor(Math.random() * 10))
	}

	function navigateToProject(id, type) {
		toggleComponent(type)
		setScrollToID(id)
	}

	function toggleComponent(componentName) {
		cycle();
		setMenuOpen(false)
		setType(componentName)
		setShowResume(componentName === "resume")
		if (window.innerWidth < 600) {
			setShowAbout(false)
		}
	}

	if (globals[0]){
		return (
			<div className={'main--container'}>
				<Header globals={globals} menuOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} toggleComponent={toggleComponent}/>
				{!menuOpen &&
					<>
						< div class={showAbout ? "box__half" : "box__half hidden"}>
							<About about={about}/>
						</div>
						{
							!showResume &&
							<div className={"projects__container"}>
								<Projects about={about} pages={pages} type={type} music={music} scrollToID={scrollToID}/>
							</div>
						}
						<Resume resume={resume} globals={globals} show={showResume} navigateToProject={navigateToProject}></Resume>
					</>

				}
				<div class={"pillar__container"}>
					<Pillar var1={var1}/>
				</div>
				<CalculateSize/>
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));
