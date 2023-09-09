import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Book from './Book';
import { BookType, AppState } from '../types';

function BooksCollection(){
    const books : BookType[] = useSelector((state:AppState) => state.search.displayedBooks);
    const isLoading : boolean = useSelector((state:AppState) => state.search.isLoading);
    const isDataFetched : boolean = useSelector((state:AppState) => state.search.isDataFetched);
    const isDataFailed : boolean = useSelector((state:AppState) => state.search.isDataFailed);


    const [numBooksToShow, setNumBooksToShow] = useState<number>(10);

    // Reset the number of displayed books whenever the fetched books get updated
    useEffect(() => {
        setNumBooksToShow(10);
    }, [books]);
    
    const handleLoadMore = () => {
        setNumBooksToShow(numBooksToShow + 30);
    }
    const showLoadMore = () => {
        return (books.length) ? (numBooksToShow >= books.length ? false : true) : false;
    }

    return (
        <div className="books-wrapper">
            {isLoading ? <h3 className="loading-indicator">Loading...</h3> : null}
            {isDataFailed ? (!isLoading && <h4 className="error-occured">An error has occured! Please try again later.</h4>) : null}
            {isDataFetched ? (isDataFailed ? null : (!isLoading && <h3 className="results-found">Found {books.length} results</h3>)) : null}
            {isLoading ? null : 
                <>
                    <div className="books-collection-wrapper">
                        {books.slice(0, numBooksToShow).map((book:BookType, id:any) => {
                            return <Book book={book} key={id}/>
                        })}
                    </div>
                    {
                        showLoadMore() ? 
                    <button onClick={handleLoadMore} className="load-more-btn">Load More</button> : null
                    }
                </>
            }
        </div>
    )
}

export default BooksCollection;