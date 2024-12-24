import Header from "../components/header";
import {useEffect, useState} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";
import {useRoute} from "preact-iso";

export function Project() {

    const [globals, setGlobals] = useState([])
    const { params } = useRoute() as { params: { id?: string } }; // Type-casting `params` with the expected type
    const projectId = params?.id;

    useEffect(() => {
        fetchPayload("https://p01--admin--cvvgvqwlxhx2.code.run", "about", 10).then((data)=>{
            setGlobals(data.docs)
        })
    }, []);

    if (globals[0]) {
        return(
            <div>
                <Header globals={globals} home={false}></Header>
                <h1>project</h1>
                {projectId ? (
                    <p>Dynamic Project ID: {projectId}</p>
                ) : (
                    <p>No project selected</p>
                )}
            </div>
        )
    }
}
