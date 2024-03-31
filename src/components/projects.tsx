// component showing a selected overview of projects
import {useEffect} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";
import {useState} from "preact/hooks";
import serialize from "../utils/serialize";

const Projects = () => {

    const [projects, setProjects] = useState([])
    console.log(projects)


    useEffect(() => {
        fetchPayload("https://p01--admin--cvvgvqwlxhx2.code.run", "project", 10).then((data)=>{
            setProjects(data.docs)
        })
    }, []);

    return(
        <div class={"projects__grid"}>
            <div className={"brief"}>
                {projects.map((p, index) => {
                    //parse projects that need to be parsed (check home:true)
                    if (p) {
                        return (
                            <div>
                                <p className={"index"}>{index}</p>
                                <p>{serialize(p.brief[0].children)}</p>
                            </div>
                        )

                    }
                })}
            </div>
            <div style={{paddingTop:"10px"}}>
                {projects.map((p, index) => {
                    //parse projects that need to be parsed (check home:true)
                    if (p) {
                        return (
                            <div style={{position:"relative"}}>
                                <img src={p.heroImage.url}/>
                                <p className={"index--image"}>{index}</p>
                            </div>
                        )

                    }
                })}
            </div>
        </div>
    )

}
export default Projects