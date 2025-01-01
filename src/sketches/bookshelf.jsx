import P5 from 'p5';
import {h, Component} from "preact";
import {shuffle} from "../utils/utils.ts";
import {getYear} from "../utils/utils.ts";

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
        let books = shuffle(this.props.books); // shuffle books
        let orange = p.color("orange") // set color
        let numberOfShelfs = 3; // set number of shelfs: todo: make this dynamic.
        let numberOfBooks = books.length;
        let shelfHeight;
        let scale = 5;

        let selectedBookIndex = null; // To track the clicked book
        let metadataDisplay = ""; // To store metadata of the clicked book

        // setup scale;
        if (window.innerHeight < 900) {
            scale = 4
        }

        if (window.innerHeight < 700) {
            scale = 3
        }

        // setup
        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
            shelfHeight = p.height / numberOfShelfs;
        }

        // draw
        p.draw = () => {
            p.background(255);
            p.stroke("black");
            p.strokeWeight(3);


            // pages
            p.noStroke()
            p.fill("black")
            //p.text(`pages: ${this.props.totalPages}`, 30, 30)
            p.stroke("black")

            for (let y = 1; y < numberOfShelfs; y++) {
                p.line(30, p.height/numberOfShelfs*y, p.width-50, p.height/numberOfShelfs*y);
            }

            // books
            let shelfHeight = p.height/numberOfShelfs;
            let gap = 5;
            let shelf = 0;
            let xPos = 30; // Initial x position

            p.strokeWeight(0.8);
            //p.fill(orange);

            for (let x = 0; x < numberOfBooks; x++) {

                // Retrieve static (predefined) size for the current book
                let book = books[x];
                let bookHeight = book.height * scale
                let bookWidth = book.depth * scale

                // Set xPos and yPos for the book
                let bookX = xPos;
                let bookY = (shelfHeight + shelf * shelfHeight) - 10;

                // Check if the mouse is hovering over the book
                let isHovering =
                    p.mouseX >= bookX &&
                    p.mouseX <= bookX + bookWidth &&
                    p.mouseY >= bookY - bookHeight &&
                    p.mouseY <= bookY;

                if (book.reading) {
                    p.fill('orange'); // Explicitly set the fill color for the circle
                    //p.stroke();
                    p.circle(bookX + bookWidth / 2, bookY + 20, 5);
                }

                // Set color: orange by default, red when hovered
                if (isHovering) {
                    selectedBookIndex = x;
                    p.fill('orange');
                    metadataDisplay = `Title: ${book.title}\nAuthor: ${book.author}`; // Load metadata
                } else {
                    p.noFill();
                }


                p.stroke('black');
                p.rect(xPos, (shelfHeight + (shelf* shelfHeight))-10, bookWidth , -bookHeight)

                if (selectedBookIndex !== null) {
                    let book = books[selectedBookIndex];
                    p.fill("orange"); // Set text color to black
                    p.textSize(16); // Set appropriate text size
                    p.noStroke()

                    p.text(
                        `Title: ${book.title}\nAuthor: ${book.author}\nPublished: ${getYear(book.datePublished)}\nPublisher: ${book.publisher}`,
                        30, // X position (adjust as needed)
                        p.height - 200 // Y position at the bottom of the canvas (adjust as needed)
                    ); // Draw metadata
                    p.noFill();
                }

                xPos += bookWidth + gap;
                if (xPos > p.width - 100) {
                    shelf += 1;
                    xPos = 30
                    if (shelf >= numberOfShelfs) break;
                }
            }


        }

        p.mousePressed = () => {
            let shelfHeight = p.height / numberOfShelfs;
            let gap = 5;
            let shelf = 0;
            let xPos = 30;

            for (let x = 0; x < books.length; x++) {
                let book = books[x];
                let bookHeight = book.height * scale;
                let bookWidth = book.depth * scale;

                let bookX = xPos;
                let bookY = (shelfHeight + shelf * shelfHeight) - 10;

                let isClicked =
                    p.mouseX >= bookX &&
                    p.mouseX <= bookX + bookWidth &&
                    p.mouseY >= bookY - bookHeight &&
                    p.mouseY <= bookY;

                if (isClicked) {
                    selectedBookIndex = x; // Store the clicked book index
                    metadataDisplay = `Title: ${book.title}\nAuthor: ${book.author}`; // Load metadata
                    break;
                }

                xPos += bookWidth + gap;
                if (xPos > p.width - 100) {
                    shelf += 1;
                    xPos = 30;
                    if (shelf >= numberOfShelfs) break;
                }
            }
        };
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
            <div style={{ height: '100vh', overflow: 'none' }} ref={(wrapper) => (this.wrapper = wrapper)}></div>
        )
    }
}

export default Bookshelf;