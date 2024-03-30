
interface AboutStates {
    about: "array"
}

const About = (props) => {
    return(
        props.about.map((a)=>{
            return(
                <div>
                    <div className={'about'}>{a}</div>
                </div>
            )
        })
    )
}

export default About