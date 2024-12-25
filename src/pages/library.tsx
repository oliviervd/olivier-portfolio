import Header from "../components/header";
import {useCachedPayload} from "../utils/fetchPayload";
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
        <div>
            {globals[0] &&
                <Header globals={globals} home={false}/>
            }
            {books[0] &&
                <div className={"bookshelf--container"}>
                    <Bookshelf books={books}/>
                </div>
            }
        </div>

    )
}



