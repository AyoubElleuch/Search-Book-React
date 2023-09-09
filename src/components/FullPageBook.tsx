import { unselectBook } from '../redux/actions/actionSelectBook';
import { BookProps } from '../types';
import { useDispatch } from 'react-redux';

function FullPageBook(props: BookProps){
    const { book } = props;

    const dispatch = useDispatch();

    const handleExit = () =>{
        dispatch(unselectBook());
    }

    return (
        <div className="full-book-wrapper">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/768px-Back_Arrow.svg.png" className="back-arrow" onClick={handleExit} alt="" />
            <img src={book.imageUrl} className="book-cover" alt="" />
            <div className="book-info-wrapper">
                <div className="book-info">
                    <p className='category'>{book.category.join('/')}</p>
                    <h2 className='title'>{book.title}</h2>
                    <p className='author'>{book.authors.join(', ')}</p>
                    <p className='description'>{book.description}</p>
                </div>
            </div>
        </div>
    )

}

export default FullPageBook;