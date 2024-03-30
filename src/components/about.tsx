import {useState, useEffect} from "preact/hooks"
import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";

interface AboutStates {
    about: "array"
}

const About = () => {

    const [about, setAbout] = useState([])

    useEffect(() => {
        fetchPayload("https://p01--admin--cvvgvqwlxhx2.code.run", "text", 10).then((data)=>{
            // loop over and fetch type "about
            for (let i=0; i<data.docs.length; i++) {
                if(data.docs[i].type=="about"){
                    const _unserializedText = data.docs[i].layout[0].text
                    const _serializedText = serialize(_unserializedText)
                    setAbout(_serializedText)
                }
            }
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