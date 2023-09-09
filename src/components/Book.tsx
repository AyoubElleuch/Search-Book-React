import { selectBook } from "../redux/actions/actionSelectBook";
import { BookProps } from "../types";
import { useDispatch } from "react-redux";

function Book(props: BookProps){
    const { book } = props;

    const dispatch = useDispatch();

    const handleBookClick = () => {
        dispatch(selectBook(book));
    }

    return (
        <div className="bookCard" onClick={handleBookClick}>
            <img src={book.imageUrl} alt="" />
            <h5 className="category text">{book.category[0]}</h5>
            <h2 className="title text">{book.title}</h2>
            <p className="author text">{book.authors.join(', ')}</p>
        </div>
    )
}

export default Book;