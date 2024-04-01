import {useEffect} from "preact/hooks";

const MusicPlayer = (props) => {

    let audio, playButton, pauseButton;

    useEffect(() => {
        let index = "audio_" + props.index;
        audio = document.getElementById(index);
        playButton = document.getElementById("play_button_" + props.index);
        pauseButton = document.getElementById("pause_button_" + props.index);
    }, [])

    function toggle() {
        if (audio.paused) {
            audio.play()
            playButton.style.display = "none";
            pauseButton.style.display = "block";
        } else {
            audio.pause()
            playButton.style.display = "block";
            pauseButton.style.display = "none";
        }
    }

    return(
        <div className={"player"}>
            <div className="play_pause-button" onClick={() => toggle()}>
                <svg id={"play_button_" + props.index} className="play-icon" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 64 64">
                    <polygon points="22,50 48,32 22,14" fill="#333"/>
                </svg>
                <svg id={"pause_button_" + props.index} className="pause-icon" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 64 64">
                    <rect x="22" y="14" width="10" height="36" fill="#333"/>
                    <rect x="38" y="14" width="10" height="36" fill="#333"/>
                </svg>
            </div>
            <div>
                <p>{props.data.title}</p>
            </div>
            <audio id={"audio_" + props.index}>
                <source src={props.data.audioFile.url}/>
            </audio>
        </div>
    )

}
export default MusicPlayer
