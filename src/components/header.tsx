import HamburgerButton from "../elements/hamburgerButton";
import "../style/navigation.css"
import {useState, useEffect, } from "react";
import {useLocation} from "react-router-dom"
import {useCachedPayload} from "./utils/fetchPayload.ts";
import {ThemeToggle} from "./themeToggle.tsx";
const Header = (props) => {

    const [isFixed, setIsFixed] = useState(false);

    // State to keep track of the current index
    const [currentIndex, setCurrentIndex] = useState(0);

    // fetch books "reading now".
    const BASE_URI = 'https://p01--admin--cvvgvqwlxhx2.code.run';
    const { data: booksData } = useCachedPayload(BASE_URI, "book", 10000); //
    const books = booksData?.docs || []
    const readingNow = booksData?.docs.filter((book) => book.reading) || [];

    useEffect(() => {
        if (readingNow.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => {
                    // Calculate the next index, looping back to 0 if at the end of the array
                    return (prevIndex + 1) % readingNow.length;
                });
            }, 3000); // Update every three seconds

            // Clean up the interval on component unmount
            return () => clearInterval(interval);
        }
    }, [readingNow]); // Empty dependency array means this effect runs once on mount

    useEffect(() => {
        const handleScroll = () => {
            // Check if the scroll position is greater than 0
            if (window.scrollY > 0) {
                setIsFixed(true); // Add the fixed style
            } else {
                setIsFixed(false); // Remove the fixed style
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup on unmount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={isFixed ? "header fixed" : "header"}>
            <div className={"header_logo"}>
                <a href={"/"}
                    className={"little-weave"}>⩨</a>
                <h1 onClick={() => props.toggleComponent("home")} className={"typo_header"}>OVND</h1>
                {readingNow.length > 0 && readingNow[currentIndex] && readingNow[currentIndex]["url"] &&
                    <h1 className={"typo_header reading"}> – is <span><a href={"/library"}>reading</a></span>: <span><a
                        href={readingNow[currentIndex]["url"]}
                        target="_blank">{readingNow[currentIndex]["title"]}</a></span>
                    </h1>
                }

            </div>
            <div className={!props.menuOpen ? "header__nav off-screen" : "header__nav on-screen"}>
                {props.home &&
                    <h1 onClick={() => props.toggleComponent("music")} className={"typo_header"}><a>music</a></h1>
                }
                {props.home &&
                    <h1 onClick={() => props.toggleComponent("curatorial")} className={"typo_header"}>
                        <a>curatorial</a>
                    </h1>
                }
                {props.home &&
                    <h1 onClick={() => props.toggleComponent("code")} className={"typo_header"}><a>code</a></h1>
                }
                {props.home &&
                    <h1 onClick={() => props.toggleComponent("resume")} className={"typo_header"}><a>cv</a></h1>
                }
                {props.home && window.innerWidth > 768 &&
                    <h1 className={"typo_header"}><a href={"/library"}>library</a></h1>
                }
                <h1>
                    <ThemeToggle/>
                </h1>
            </div>

            <div onClick={() => props.toggleMenu()} className={"header__nav-button"}>
                <HamburgerButton/>
            </div>
        </header>
    )
}


export default Header;