
import Header from "../header.tsx";
import {useState} from "react";
import {useCachedPayload} from "../utils/fetchPayload.ts";
import {Helmet} from "react-helmet"
import Bookshelf from "../sketches/bookshelf"
import {BookList} from "./books-list";
import "../../style/library.css"
import '../../style.css';
import '../../style/normalize.css'
import '../../style/project.css'
import '../../style/music.css'

export function Library() {

    const [view ,setView] = useState("shelf")
    const [var1, setVar1] = useState(Math.floor(Math.random() * 10))

    // fetch data from API
    const BASE_URI = 'https://p01--admin--cvvgvqwlxhx2.code.run';
    const { data: aboutData } = useCachedPayload(BASE_URI, "about", 10000); // globals
    const { data: booksData } = useCachedPayload(BASE_URI, "book", 10000); //
    const books = booksData?.docs || []
    const globals = aboutData?.docs || []
    let pages = 0;
    const [showFilters, setShowFilters] = useState(true);
    const [tags, setTags] = useState<string[]>([]); // Using state for tags
    let options =  [
        "art",
        "design",
        "graphic design",
        "exhibition catalogue",
        "curatorial",
        "museology",
        "computation",
        "AI",
        "ecology",
        "philosophy",
        "architecture",
        "theory",
        "history",
        "feminism",
        "science-fiction",
        "media",
        "urban",
        "weaving",
        "sociology",
        "creative-coding"
    ] // todo: make this dynamic (parse from API)

    function handleTag(o: string) {
        setTags((prevTags) =>
            prevTags.includes(o) ? prevTags.filter((tag) => tag !== o) : [...prevTags, o]
        );
    }

    console.log(tags)

    for (let i = 0; i < books.length; i += 10) {
        pages += books[i]["pages"] || []
    }

    // todo: number of main (tota)
    // todo: filter (non-fiction, fiction)

    return(
        <>
            <Helmet>
                <title>Library - Olivier Van D'huynslager</title>
                <meta name="description" content="Personal library (index) of Books of Olivier Van D'huynslager."/>
                <meta name="author" content="Olivier Van D'huynslager"/>
                <meta name="keywords"
                      content="Olivier Van D'huynslager, Olivier, Van D'huynslager, books, library, bookshelf, p5, sketch"/>
                <meta property="og:url" content="https://oliviervandhuynslager.net/library"/>
                <meta property="og:type" content="website"/>
                <meta name="og:title" content="Library - Olivier Van D'huynslager"/>
                <meta name="og:description" content="Personal library (index) of Books of Olivier Van D'huynslager."/>
                <script type="application/ld+json">
                    {`
                     {
                       "@context": "https://schema.org",
                       "@type": "WebPage",
                       "name": "Library Page",
                       "url": "https://oliviervandhuynslager.net/library",
                       "description": "Explore books and resources in the library of Olivier Van D'huynslager."
                     }
                   `}
                </script>
            </Helmet>

            {globals[0] &&
                <Header globals={globals} home={false}/>
            }

            {books[0] &&
                <div className={"bookshelf--container"}>
                    <div className={"bookshelf__nav"}>
                        <div className={"bookshelf__switch"}>
                            <a onClick={() => {
                                setView("list")
                            }}>list</a>
                            <a onClick={() => {
                                setView("shelf")
                            }}>shelf</a>
                        </div>
                        <a onClick={()=>setShowFilters(!showFilters)}>filters</a>
                    </div>
                    {view === "shelf" &&
                        <Bookshelf books={books} totalPages={pages} tags={tags}/>
                    }
                    {view === "list" &&
                        <BookList books={books} tags={tags}/>
                    }
                    {showFilters &&
                        <div className={"bookshelf__filters"}>
                            {tags.length > 0 &&
                                <div className={"clear"}>
                                    <a onClick={()=>setTags([])}>clear all</a>
                                </div>
                            }
                            {options.map((o) => {
                                    return (
                                        <div>
                                            <a style={{color: tags.includes(o) ? "white" : "black"}} onClick={()=>handleTag(o)}>{o}</a>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    }
                </div>
            }

        </>

    )
}



