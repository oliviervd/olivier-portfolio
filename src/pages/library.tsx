import Header from "../components/header";
import {useCachedPayload} from "../utils/fetchPayload";
import Bookshelf from "../sketches/bookshelf";
import "../style/library.css"

export function Library() {

    // fetch data from API
    const BASE_URI = 'https://p01--admin--cvvgvqwlxhx2.code.run';
    const { data: aboutData } = useCachedPayload(BASE_URI, "about", 10000);
    const globals = aboutData?.docs || []

    //todo: insert P5
    return(
        <div>
            {globals[0] &&
                <Header globals={globals} home={false}/>
            }
            <div className={"bookshelf--container"}>
                <Bookshelf/>
            </div>
        </div>

    )
}



