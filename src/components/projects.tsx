// component showing a selected overview of projects
import {useState} from "preact/hooks";
import serialize from "../utils/serialize";
import MusicPlayer from "./musicPlayer";
import About from "./about";

const Projects = (props) => {

    const [page, setPage] = useState([])
    // fetch the right page from the pages api based on the type.
    props.pages.map((p)=>{
        if (props.type == p.title) {
            // set content (array)
            setPage(p.content)
        }
    })

    function scroller(id) {
        const scrollToElem = document.getElementById(id)
        scrollToElem.scrollIntoView({behavior:"smooth"})
    }

    return(
        <div class={"projects__grid"}>
            <div className={"brief"}>
                {page.map((p, index) => {
                    return (
                        <section>
                            <div>
                                <p id={p.content.id} className={"index"}>{index}</p>
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
                {props.type === "home" &&
                    <div className={"bio_text"}>
                        <About about={props.about}/>
                    </div>
                }
                {page.map((p, index) => {
                    return (
                        <div style={{position: "relative"}}>
                            {/* todo: onClick image scroll to element (index above) with same ID */}
                            <img onClick={()=>scroller(p.content.id)} id={p.content.id} src={p.content.heroImage.url} alt={p.content.heroImage.alt}/>
                            <p className={"index--image"}>{index}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}
export default Projects