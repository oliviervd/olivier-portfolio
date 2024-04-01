import "../style/resume.css"
import serialize from "../utils/serialize";

const Resume = (props) => {
    let r = props.resume;
    return(
        <section class={props.show ? "resume__container on-screen" : "resume__container off-screen-right"}>
            <img className={"bio-img"} src={props.globals[0]["headshot"]["url"]} alt={"profile picture of Olivier Van D'huynslager"}/>
            <p class={"intro"}>{serialize(r.intro[0].children)}</p>
            <p className={"typo_header resume__container-divider"}>EXPERIENCE</p>
            {r.experiences.map((exp)=>{
                if (exp.display) {
                    return(
                        <div className={"experience"}>
                            <p>{exp.startDate} – {exp.endDate}</p>
                            <p>{exp.title}</p>
                            <p>{exp.organisation}</p>
                        </div>
                    )
                }
            })}
            <p className={"typo_header resume__container-divider"}>EDUCATION</p>
            {r.educations.map((edu)=>{
                if (edu.display) {
                    return (
                        <div className={"education"}>
                            <p>{edu.endDate}</p>
                            <p>{edu.title}</p>
                            <p>{edu.organisation}</p>
                        </div>
                    )
                }

            })}
            <p className={"typo_header resume__container-divider"}>WORK//COMMISSIONS</p>
            {r.commissions.map((c)=> {
                if (c.display) {
                    return (
                        <div className={"experience"}>
                            <p>{c.endDate}</p>
                            <p>{c.title}</p>
                            <p>{c.type}</p>
                        </div>
                    )
                }
            })}
        </section>
    )
}

export default Resume