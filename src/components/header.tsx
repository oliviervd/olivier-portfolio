import HamburgerButton from "../elements/hamburgerButton";
import "../style/navigation.css"
import {useState, useEffect} from "preact/hooks";
const Header = (props) => {

    // State to keep track of the current index
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                // Calculate the next index, looping back to 0 if at the end of the array
                return (prevIndex + 1) % props.globals[0]["readingNow"].length;
            });
        }, 3000); // Update every three seconds

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <header>
            <div className={"header_logo"}>
                <h1 onClick={()=>props.toggleComponent("home")} className={"little-weave"}>⩨</h1>
                <h1 onClick={()=>props.toggleComponent("home")} className={"typo_header"}>OVND</h1>
                <h1 className={"typo_header reading"}> – is reading: <span><a href={props.globals[0]["readingNow"][currentIndex]["url"]} target="_blank">{props.globals[0]["readingNow"][currentIndex]["title"]}</a></span></h1>
            </div>
            <div className={!props.menuOpen ? "header__nav off-screen" : "header__nav on-screen"}>
                <h1 onClick={() => props.toggleComponent("music")} className={"typo_header"}><a>music</a></h1>
                <h1 onClick={() => props.toggleComponent("curatorial")} className={"typo_header"}><a>curatorial</a></h1>
                <h1 onClick={() => props.toggleComponent("resume")} className={"typo_header"}><a>cv</a></h1>
            </div>
            <div onClick={() => props.toggleMenu()} className={"header__nav-button"}>
                <HamburgerButton/>
            </div>
        </header>
    )
}



export default Header;