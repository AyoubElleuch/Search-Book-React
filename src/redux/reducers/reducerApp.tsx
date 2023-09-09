import { Reducer } from 'redux';
import { FETCHING_BOOKS,
    FETCH_BOOKS_FAILURE,
    FETCH_BOOKS_SUCCESS,
    INPUT_CHANGE,
    SELECT_BOOK,
    UNSELECT_BOOK,
    UPDATE_SELECTED_CATEGORY,
    UPDATE_SORTING } from "../constants";
import { StateType, ActionType, BookType } from '../../types';


const initialState : StateType = {
    input: '',
    isLoading: false,
    fetchedBooks: [],
    displayedBooks: [],
    allCategories: ['All'],
    selectedCategory: 'All',
    sortedBy: 'Newest',
    isDataFetched: false,
    isDataFailed: false,
    selectedBook: null
}

const reducerApp: Reducer<StateType, ActionType> = (state = initialState, action: any) =>{
    switch(action.type){
        case FETCHING_BOOKS:
            return {
                ...state,
                isLoading: true
            }
        
        case FETCH_BOOKS_SUCCESS:
            return {
                ...state,
                fetchedBooks: action.payload.newData,
                displayedBooks: action.payload.newData,
                allCategories: action.payload.uniqueCategories,
                selectedCategory: 'All',
                isLoading: false,
                isDataFetched: true
            }
        
        case FETCH_BOOKS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isDataFetched: true,
                isDataFailed: true
            }
        
        case INPUT_CHANGE:
            return {
                ...state,
                input: action.payload
            }
        
        case UPDATE_SELECTED_CATEGORY:
            if(action.payload === 'All'){
                return {
                    ...state,
                    selectedCategory: 'All',
                    displayedBooks: state.fetchedBooks
                }
            }
            return {
                ...state,
                selectedCategory: action.payload,
                displayedBooks: state.fetchedBooks.filter((book:any) => {
                    return book.category.indexOf(action.payload) !== -1;
                })
            }
        
        case UPDATE_SORTING:
            const sortedBooks = [...state.displayedBooks];
            if(action.payload === 'Newest'){
                sortedBooks.sort((a: BookType, b: BookType) => {
                    const dateA = new Date(a.publishedDate);
                    const dateB = new Date(b.publishedDate);
                    return dateB.getTime() - dateA.getTime();
                });
            }else if (action.payload === 'Oldest') {
                sortedBooks.sort((a: BookType, b: BookType) => {
                    const dateA = new Date(a.publishedDate);
                    const dateB = new Date(b.publishedDate);
                    return dateA.getTime() - dateB.getTime();
                });
            }else if(action.payload === 'HighestPageCount') {
                sortedBooks.sort((a: BookType, b: BookType) => {
                    return b.pageCount - a.pageCount;
                })
            }else if(action.payload === 'LowestPageCount') {
                sortedBooks.sort((a: BookType, b: BookType) => {
                    return a.pageCount - b.pageCount;
                })
            }
            return {
                ...state,
                sortedBy: action.payload,
                displayedBooks: sortedBooks,
            }
        
        case SELECT_BOOK:
            return {
                ...state,
                selectedBook: action.payload
            }
        
        case UNSELECT_BOOK:
            return {
                ...state,
                selectedBook: null
            }
        
        default:
            return state
    }
}

export default reducerApp;