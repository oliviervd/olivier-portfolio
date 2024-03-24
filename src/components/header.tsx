const Header = (props) => {
    return(
        <header>
            <h1 className={"typo_header"}>Olivier Van D'huynslager</h1>
            <div/>
            <div className={"right"}>
                <h1 className={"right typo_header inactive"}><a>music</a></h1>
                <h1 className={"right typo_header inactive"}><a>code</a></h1>
                <h1 className={"right typo_header"} onClick={()=>props.setShowResume(!props.showResume)}><a>cv</a></h1>
                <h1 className={"right typo_header inactive"}><a>curatorial</a></h1>
            </div>
        </header>
    )
}

export default Header;