import p5 from 'p5';
import {h, Component} from "preact";

class Button extends Component {
    componentDidMount() {
        this.canvas = new p5(this.sketch, this.wrapper)
    }

    componentWillUnmount() {
        this.canvas.remove()
    }

    sketch = (p) => {

        var elemX = 5;
        var elemY = 5;
        let chars = "░▒▓█"

        p.setup = () => {
            p.createCanvas(50,50)
        }

        p.draw = () => {
            p.background("none");
            //p.stroke("orange");
            p.fill("orange");
            p.textFont("IBMPlexMono-Bold");
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(8);

            for (let x=0 ; x < elemX; x ++) {
                for (let y = 0 ; y <elemY; y ++) {

                    let posY = p.map(y, 0, elemY, 0, p.height);
                    let magX = p.map(p.sin(p.radians(posY * 1 + p.frameCount)), -1, 1, -20, 20)
                    let posX = p.map(x, 0, elemX, -magX, magX);

                    let selector = p.int(p.map(y, 0, elemY, 0, chars.length))
                    //p.line(10, 10*y, 40, 10*y)


                    p.push()
                    p.translate(p.width/2 + posX, posY)
                    p.noStroke();
                    p.text(chars[selector], 0 ,0)
                    p.pop()
                }
            }

        }

    }

    render() {
        return (
            <div ref={(wrapper) => (this.wrapper = wrapper)}></div>
        )
    }
}
export default Button;