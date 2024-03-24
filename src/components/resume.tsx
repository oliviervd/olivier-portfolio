const Resume = (props) => {
    return(
        <section class={props.show ? "resume__container" : "resume__container hidden"}>
            <p className={"resume__container-divider"}>EXPERIENCE</p>
            <div className={"experience"}>
                <p>2024 – * * *</p>
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
                <p>meemoo (former PACKED)</p>
            </div>
            <div className={"experience"}>
                <p>2017</p>
                <p>intern assistent curator</p>
                <p>Netwerk Aalst</p>
            </div>
            <p className={"resume__container-divider"}>EDUCATION</p>
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
        </section>
    )
}

export default Resume