import "../style/resume.css"

const Resume = (props) => {
    console.log(props.globals[0]["readingNow"][0])
    return(
        <section class={props.show ? "resume__container on-screen" : "resume__container off-screen-right"}>
            <img className={"bio-img"} src={props.globals[0]["headshot"]["url"]}/>
            <p class={"intro"}>[b. 1992, BE] – lives and works in Ghent – Embracing the chaotic nature of things – Permacomputing the museum – Messing around with micro-computers – Looking for empty book shelves. [<span><a href={"https://github.com/oliviervd"} target="_blank">Github</a></span>]|[<span><a href={"https://www.instagram.com/olivier_vandh/"} target="_blank">instagram</a></span>]</p>
            <p className={"typo_header resume__container-divider"}>EXPERIENCE</p>
            <div className={"experience"}>
                <p>2024 – NOW</p>
                <p>curator digital culture and design</p>
                <p>Design Museum Gent</p>
            </div>
            <div className={"experience"}>
                <p>2020 – 2023</p>
                <p>collections of ghent (project manager)</p>
                <p>Design Museum Gent</p>
            </div>
            <div className={"experience"}>
                <p>2019 – 2020</p>
                <p>digital data management</p>
                <p>Design Museum Gent</p>
            </div>
            <div className={"experience"}>
                <p>2018 – 2019</p>
                <p>project employee</p>
                <p>meemoo</p>
            </div>
            <div className={"experience"}>
                <p>2017</p>
                <p>intern assistent curator</p>
                <p>Netwerk Aalst</p>
            </div>
            <div className={"experience"}>
                <p>2017</p>
                <p>intern</p>
                <p>Kiosk Gent</p>
            </div>
            <div className={"experience"}>
                <p>2016</p>
                <p>intern </p>
                <p>M HKA</p>
            </div>
            <p className={"typo_header resume__container-divider"}>EDUCATION</p>
            <div className={"education"}>
                <p>2024</p>
                <p>Master Curating the Digital (MOOC)</p>
                <p>NODE</p>
            </div>
            <div className={"education"}>
                <p>2017</p>
                <p>Postgraduate in Curatorial Studies</p>
                <p>KASK</p>
            </div>
            <div className={"education"}>
                <p>2016</p>
                <p>Master of Arts in Art History, Musicology and Theatre Studies</p>
                <p>UGent</p>
            </div>
            <div className={"education"}>
                <p>2015</p>
                <p>Bachelor of Arts in Art History, Musicology and Theatre Studies</p>
                <p>UGent</p>
            </div>
            <p className={"typo_header resume__container-divider"}>WORK//COMMISSIONS</p>
            <div className={"experience"}>
                <p>2024</p>
                <p>ZOOM / RESOLUTION / SERVER-SIDE DECAY</p>
                <p>curatorial</p>
            </div>
            <div className={"experience"}>
                <p>2024</p>
                <p>Searcher</p>
                <p>curatorial</p>
            </div>
            <div className={"education"}>
                <p>2024</p>
                <p>Web portfolio Ewoud Viane</p>
                <p>web-dev</p>
            </div>
            <div className={"education"}>
                <p>2024</p>
                <p>Web portfolio Xavier Van D'huynslager</p>
                <p>web-dev</p>
            </div>
            <div className={"education"}>
                <p>2023</p>
                <p>collection API (design museum gent)</p>
                <p>web-dev</p>
            </div>
            <div className={"education"}>
                <p>2022</p>
                <p>DOR (composition soundtrack)</p>
                <p>music</p>
            </div>
            <div className={"education"}>
                <p>2022</p>
                <p>Wacht (composition soundtrack)</p>
                <p>music</p>
            </div>
        </section>
    )
}

export default Resume