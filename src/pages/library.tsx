import Header from "../components/header";
import {useCachedPayload} from "../utils/fetchPayload";
import Helmet from "preact-helmet/es/Helmet";
import Bookshelf from "../sketches/bookshelf";
import "../style/library.css"

export function Library() {

    // fetch data from API
    const BASE_URI = 'https://p01--admin--cvvgvqwlxhx2.code.run';
    const { data: aboutData } = useCachedPayload(BASE_URI, "about", 10000); // globals
    const { data: booksData } = useCachedPayload(BASE_URI, "book", 10000); //
    const books = booksData?.docs || []
    const globals = aboutData?.docs || []

    console.log(books)

    //todo: insert P5
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
            </Helmet>

            {globals[0] &&
                <Header globals={globals} home={false}/>
            }

            {books[0] &&
                <div className={"bookshelf--container"}>
                    <Bookshelf books={books}/>
                </div>
            }

        </>

    )
}



