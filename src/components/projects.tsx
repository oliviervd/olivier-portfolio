// component showing a selected overview of projects
import {useEffect, useState} from "preact/hooks";
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

            // 660be19b2f6aec216ef87257
            // 660a6dd351ea860056d8380f
        }
    })

    useEffect(()=> {
        if (props.scrollToID){
            scroller(props.scrollToID);
        }
    },[])

    function scroller(id) {
        // select element
        const scrollToElem = document.getElementById(id)
        const targetScrollPosition = scrollToElem.offsetTop - 5;

        console.log(id)
        // Scroll to the target position
        window.scrollTo({
            top: targetScrollPosition,
            behavior: "smooth"
        });


        // highlight selected
        // Remove "selected" class from all elements
        const allElements = document.querySelectorAll('.selected');
        allElements.forEach(element => {
            element.classList.remove('selected');
            element.classList.add('index')
        });

        scrollToElem.className = "selected"
        // remove highlight others
    }

    return(
        <div class={"projects__grid"}>
            <div id={"brief"} className={"brief"}>
                {page.map((p, index) => {
                    console.log(p)
                    return (
                        <section>
                            <div>
                                <p id={p.content.id} className={"index"}>{index}</p>
                                <p> {props.type === "home" &&
                                    <span className={"type"}>{`[${p.content.type}]`} – </span>
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