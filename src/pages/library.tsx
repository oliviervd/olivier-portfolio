import Header from "../components/header.tsx";
import {useState} from "preact/hooks";
import {useCachedPayload} from "../utils/fetchPayload.ts";
import Bookshelf from "../sketches/bookshelf";
import "../style/library.css"
import {BookList} from "./books-list.tsx";
import Pillar from "../sketches/pillar";

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

    for (let i = 0; i < books.length; i += 10) {
        pages += books[i]["pages"] || []
    }

    console.log(pages)

    // todo: add listview
    // todo: number of pages (tota)
    // todo: filter (non-fiction, fiction)

    return(
        <div>
            {globals[0] &&
                <Header globals={globals} home={false}/>
            }
            {books[0] &&
                <div className={"bookshelf--container"}>

                    <div className={"bookshelf__switch"}>
                        <a onClick={()=>{setView("list")}}>list</a>
                        <a onClick={()=>{setView("shelf")}}>shelf</a>
                    </div>
                    {view === "shelf" &&
                        <Bookshelf books={books} totalPages={pages}/>
                    }
                    {view === "list" &&
                        <BookList books={books}/>
                    }
                </div>
            }
        </div>

    )
}



