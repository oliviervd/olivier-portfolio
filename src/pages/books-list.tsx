import {getYear} from "../utils/utils.ts";
import Pillar from "../sketches/pillar";

export function BookList() {

    const years = []

    const filteredBooks = this.props.books.filter((book) => {
        // If tags are not an empty array, filter books based on tags and categories
        return this.props.tags.length === 0 ||
            (Array.isArray(book.category) && book.category.some((cat) => this.props.tags.includes(cat)));
    });

// Extract unique years from the filtered books
    filteredBooks.forEach((book) => {
        const year = getYear(book.datePublished);
        if (!years.includes(year)) {
            years.push(year);
        }
    });
    return(
        <section>
            <section style={{display: "grid", gridTemplateColumns: "0.5fr 5fr"}}>
                <div></div>
                <div className={"table__header"}>
                    <h2>author</h2>
                    <h2>title - year</h2>
                    <h2>publisher</h2>
                </div>
            </section>

            {years.sort().reverse().map((y) => {
                return (
                    <>
                        <section style={{display: "grid", gridTemplateColumns: "0.5fr 5fr", paddingBottom: "20px"}}>
                            <div className={"table__group"}>
                                <h1>{y}</h1>
                            </div>
                            <div>
                                {filteredBooks.map((book) => {
                                    if (getYear(book.datePublished) === y) {
                                        return (
                                            <div className={"table__body"}>
                                                <div>{book.author}</div>
                                                <div>{book.title}{book.subtitle &&
                                                    <span>: {book.subtitle}</span>} - {getYear(book.datePublished)}</div>
                                                <div>{book.publisher}</div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </section>
                        <div className={"seperator"}>** ** **</div>
                    </>

                )
            })}
        </section>

    )
}