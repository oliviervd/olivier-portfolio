import P5 from 'p5';
import {h, Component} from "preact";


class Bookshelf extends Component {
    componentDidMount() {
        this.canvas = new P5(this.sketch, this.wrapper)
        window.addEventListener('resize', this.handleResize)
    }
    componentWillUnmount() {
        this.canvas.remove()
        window.removeEventListener('resize', this.handleResize);
    }

    sketch = (p) => {
        // fetch data from API
        let books = this.props.books;
        let orange = p.color("orange")
        let numberOfShelfs = 5;
        let shelfWidth = 100;
        let numberOfBooks = books.length;
        let bookSizes = []; // Store predefined book sizes
        let shelfHeight;

        // setup
        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
            shelfHeight = p.height / numberOfShelfs;
        }

        // draw
        p.draw = () => {
            p.background(255);
            p.stroke(orange);
            p.strokeWeight(3);
            for (let y = 1; y < numberOfShelfs; y++) {
                p.line(30, p.height/numberOfShelfs*y, p.width-50, p.height/numberOfShelfs*y);
            }

            // books

            let shelfHeight = p.height/numberOfShelfs;
            let gap = 5;
            let shelf = 0;
            let xPos = 30; // Initial x position



            p.strokeWeight(2);
            //p.fill(orange);

            for (let x = 0; x < numberOfBooks; x++) {

                console.log(books[x])

                // Retrieve static (predefined) size for the current book
                let book = books[x];
                let bookHeight = book.height * 4.5
                let bookWidth = book.depth * 4.5

                // Set xPos and yPos for the book
                let bookX = xPos;
                let bookY = (shelfHeight + shelf * shelfHeight) - 10;

                // Check if the mouse is hovering over the book
                let isHovering =
                    p.mouseX >= bookX &&
                    p.mouseX <= bookX + bookWidth &&
                    p.mouseY >= bookY - bookHeight &&
                    p.mouseY <= bookY;

                // Set color: orange by default, red when hovered
                if (isHovering) {
                    p.fill('orange');
                } else {
                    p.noFill();
                }

                p.rect(xPos, (shelfHeight + (shelf* shelfHeight))-10, bookWidth , -bookHeight)
                xPos += bookWidth + gap;
                if (xPos > p.width - 100) {
                    shelf += 1;
                    xPos = 30

                    if (shelf >= numberOfShelfs) break;
                }
                // draw book
                // add width book
                //x + book(x).width;
            }

        }
    }

    handleResize = () => {
        // resize canavas when the window is resized.
        const newHeight = window.innerHeight; // Set height to window height
        this.canvas.resizeCanvas(this.wrapper.offsetWidth, newHeight)
    }

    componentDidUpdate(prevProps) {
        // If var1 prop has changed, trigger a redraw
        if (prevProps.var1 !== this.props.var1) {
            this.canvas.updateVar1(this.props.var1);
        }
    }

    render() {
        return (
            <div style={{ height: '90vh', overflow: 'none' }} ref={(wrapper) => (this.wrapper = wrapper)}></div>
        )
    }

}

export default Bookshelf;