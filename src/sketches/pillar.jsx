import P5 from 'p5';
import {h, Component} from "preact";

class Pillar extends Component {
    componentDidMount() {
        this.canvas = new P5(this.sketch, this.wrapper)
        window.addEventListener('resize', this.handleResize)
    }
    componentWillUnmount() {
        this.canvas.remove()
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        // resize canavas when the window is resized.
        this.canvas.resizeCanvas(this.wrapper.offsetWidth, this.wrapper.offsetHeight)
    }

    sketch = (p) => {
        var elementsX = 10;
        var elementsY = 100;

        // p5.js setup function
        p.setup = () => {
            const w = this.props.width || this.wrapper.offsetWidth;
            const h = this.props.height || this.wrapper.offsetHeight;
            p.createCanvas(window.innerWidth, window.innerHeight);
        };

        // p5.js draw function
        p.draw = () => {
            p.background(255);

            p.fill("orange");
            p.noStroke();

            p.textFont("IBMPlexMono-Bold");
            p.textAlign(p.CENTER, p.CENTER);

            p.textSize(30);


            for (let y = 0; y < elementsY + 1; y++) {
                for (let x=0; x < elementsX + 1; x++){

                    let posY = p.map(y, 0, elementsY, 0, p.height)
                    let magX = p.map(p.sin(p.radians(posY * 1 + p.frameCount)), -1, 1, -200, 200)
                    let posX = p.map(x, 0, elementsX, -magX, magX);

                    // create matrix
                    p.push();
                    p.translate(p.width/2 + posX, posY);
                    p.text("░",0, 0);
                    p.pop();
                }
            }
        }
        // Add more p5.js functions as needed
    }


    render() {
        return (
            <div ref={(wrapper) => (this.wrapper = wrapper)}></div>
        )
    }
}

export default Pillar;