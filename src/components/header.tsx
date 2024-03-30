import HamburgerButton from "../elements/hamburgerButton";
import "../style/navigation.css"
import {useState} from "preact/hooks";

const Header = (props) => {

    return (
        <header>
            <div className={"header_logo"}>
                <h1 className={"little-weave"}>⩨</h1>
                <h1 className={"typo_header"}>OVND</h1>
                <h1 className={"typo_header reading"}> – is reading: <span><a href={"https://www.legacyrussell.com/GLITCHFEMINISM"} target="_blank">Glitch Feminism</a></span></h1>
            </div>
            <div className={!props.menuOpen ? "header__nav off-screen" : "header__nav on-screen"}>
                <h1 className={"typo_header"} onClick={() => props.toggleAbout()}><a>about</a></h1>
                <h1 className={"typo_header inactive"}><a>music</a></h1>
                <h1 className={"typo_header inactive"}><a>code</a></h1>
                <h1 className={"typo_header"} onClick={() => props.resume()}><a>cv</a></h1>
                <h1 className={"typo_header inactive"}><a>curatorial</a></h1>
            </div>
            <div onClick={() => props.toggleMenu()} className={"header__nav-button"}>
                <HamburgerButton/>
            </div>
        </header>
    )
}



export default Header;