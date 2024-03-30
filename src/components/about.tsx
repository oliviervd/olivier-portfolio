import {useState, useEffect} from "preact/hooks"
import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";

interface AboutStates {
    about: "array"
}

const About = () => {

    const [about, setAbout] = useState([])

    useEffect(() => {
        fetchPayload("https://p01--admin--cvvgvqwlxhx2.code.run", "about", 10).then((data)=>{
            // loop over and fetch type "about
            console.log(data)
            const _unserializedText = data.docs[0]["bio"]
            const _serializedText = serialize(_unserializedText)
            setAbout(_serializedText)
        })
    }, []);

    return(
        about.map((a)=>{
            return(
                <div>
                    <div className={'about'}>{a}</div>
                </div>
            )
        })
    )
}

export default About