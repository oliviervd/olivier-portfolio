import '../../style.css';
import '../../style/normalize.css'
import '../../style/project.css'
import '../../style/music.css'
import Header from "../header";
import About from "../about";
import Pillar from "../sketches/pillar"
import Resume from "../resume";
import {useState, useEffect} from "react";
import {useCachedPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";
import Projects from "../projects";
import CalculateSize from "../fetchSize";
import {Helmet} from "react-helmet"

export function Home() {

	const [showResume, setShowResume] = useState(false)
	const [showAbout, setShowAbout] =useState(true)
	const [type, setType] = useState("home")
	const [menuOpen, setMenuOpen] = useState(false)
	const [scrollToID, setScrollToID] = useState(null)
	const [var1, setVar1] = useState(Math.floor(Math.random() * 10))
	let about = []

	// BASE_URI
	// todo: move to env?
	const BASE_URI = 'https://p01--admin--cvvgvqwlxhx2.code.run';

	// fetch data
	const { data: pagesData } = useCachedPayload(BASE_URI, "page", 10000);
	const { data: musicData } = useCachedPayload(BASE_URI, "music", 10000);
	const { data: resumeData } = useCachedPayload(BASE_URI, "resume", 10000);
	const { data: aboutData } = useCachedPayload(BASE_URI, "about", 10000);

	// derive states from the cached data.
	const pages = pagesData?.docs || []
	const music = musicData?.docs || []
	const resume = resumeData?.docs[0] || []
	const globals = aboutData?.docs || []
	if (aboutData?.docs[0]["bio"]) {
		about = serialize(aboutData?.docs[0]["bio"])
	}

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
			<>
				<Helmet>
					<title>Olivier Van D'huynslager - Homepage</title>
					<meta name="description" content="Homepage of Olivier Van D'huynslager - website"/>
					<meta property="og:title" content="Olivier Van D'huynslager - Homepage"/>
					<meta property="og:description" content="Homepage of Olivier Van D'huynslager - website"/>
				</Helmet>
				<div className={'main--container'}>
					<Header globals={globals} menuOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)}
							toggleComponent={toggleComponent} home={true}/>

					<>
						< div className={showAbout ? "box__half" : "box__half hidden"}>
							<About about={about}/>
						</div>
						{
							!showResume &&
							<div className={"projects__container"}>
								<Projects about={about} pages={pages} type={type} music={music}
										  scrollToID={scrollToID}/>
							</div>
						}
						<Resume resume={resume} globals={globals} show={showResume}
								navigateToProject={navigateToProject}></Resume>

					</>

					<div className={"pillar__container"}>
						<Pillar var1={var1}/>
					</div>
					<CalculateSize/>
				</div>
			</>
		);
	}
}

//render(<App/>, document.getElementById('app'));
