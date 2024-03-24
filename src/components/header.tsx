import HamburgerButton from "../elements/hamburgerButton";
import "../style/header.css"
import {useState} from "preact/hooks";

const Header = (props) => {

    return(
        <header>
            <h1 style={{marginLeft: "10px"}} className={"typo_header"}>Olivier Van D'huynslager</h1>
            <div/>
            <div className={props.menuOpen ? "header__nav off-screen" : "header__nav on-screen"}>
                <h1 className={"typo_header inactive"}><a>music</a></h1>
                <h1 className={"typo_header inactive"}><a>code</a></h1>
                <h1 className={"typo_header"} onClick={()=>props.setShowResume(!props.showResume)}><a>cv</a></h1>
                <h1 className={"typo_header inactive"}><a>curatorial</a></h1>
            </div>
            <div onClick={()=>props.setMenuOpen(!props.menuOpen)} className={"header__nav-button"}>
                <HamburgerButton/>
            </div>
        </header>
    )
}

export default Header;