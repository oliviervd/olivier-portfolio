// component showing a selected overview of projects
import {useEffect} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";
import {useState} from "preact/hooks";
import serialize from "../utils/serialize";
import MusicPlayer from "./musicPlayer";

const Projects = (props) => {

    const [page, setPage] = useState([])

    // fetch the right page from the pages api based on the type.
    props.pages.map((p)=>{
        if (props.type == p.title) {
            // set content (array)
            setPage(p.content)
        }
    })

    return(
        <div class={"projects__grid"}>
            <div className={"brief"}>
                {page.map((p, index) => {
                    return (
                        <section>
                            <div>
                                <p className={"index"}>{index}</p>
                                <p> {props.type === "home" &&
                                    <span className={"type"}>{`[${p.content.type}]`}</span>
                                }{serialize(p.content.brief[0].children)}</p>
                            </div>
                            {p.content.type === "music"  &&
                               props.music.map((m, index)=>{
                                   if(m.project.id === p.content.id) {
                                       return(
                                           <MusicPlayer data={m} index={index}/>
                                       )
                                   }
                               })
                            }
                        </section>
                    )
                })}
            </div>
            <div style={{paddingTop: "10px"}}>
                {page.map((p, index) => {
                    return (
                        <div style={{position: "relative"}}>
                            <img src={p.content.heroImage.url} alt={p.content.heroImage.alt}/>
                            <p className={"index--image"}>{index}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}
export default Projects