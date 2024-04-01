import MusicPlayer from "../components/musicPlayer";
import {useEffect, useState} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";

const Music = () => {

    const [music, setMusic] = useState([])
    const [projects, setProjects] = useState([])

    // fetch data
    useEffect(() => {
        fetchPayload("https://p01--admin--cvvgvqwlxhx2.code.run", "music", 10).then((data)=>{
            setMusic(data.docs)
        })
        fetchPayload("https://p01--admin--cvvgvqwlxhx2.code.run", "project", 10).then((data)=>{
            setProjects(data.docs)
        })
    }, []);

    return(
        <div class={"projects__grid"}>
            <div className={"brief"}>
                {projects.map((p, index) => {

                    //parse projects that need to be parsed (check home:true)
                    if (p.type === "music") {
                        return (
                            <div>
                                <div>
                                    <p className={"index"}>{index}</p>
                                    <p>{serialize(p.brief[0].children)}</p>
                                </div>
                                {music.map((m,index)=>{
                                    if(m.project.id === p.id) {
                                        console.log(m)
                                        return (
                                            <MusicPlayer data={m} index={index}/>
                                        )
                                    }
                                })}
                            </div>

                        )


                    }

                })}
            </div>
            <div style={{paddingTop: "10px"}}>
                {projects.map((p, index) => {
                    if (p.type === "music") {
                        return (
                            <div style={{position: "relative"}}>
                                <img src={p.heroImage.url} alt={p.heroImage.alt}/>
                                <p className={"index--image"}>{index}</p>
                            </div>
                        )
                    }

                })}
            </div>
        </div>

    )
}
export default Music