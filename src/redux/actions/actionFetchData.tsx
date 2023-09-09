import axios from 'axios';
import { API_KEY, FETCHING_BOOKS, FETCH_BOOKS_FAILURE, FETCH_BOOKS_SUCCESS, NO_COVER_IMAGE, UNSELECT_BOOK, UPDATE_SORTING } from '../constants';

export const fetchBooks = (searchQuery: string) => {
  return async (dispatch: any) => {
        // Trigger the loading indicator
        dispatch({ type: UNSELECT_BOOK});
        dispatch({type: FETCHING_BOOKS});

        // Handle the API call
        try {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q='+searchQuery+'&key='+API_KEY,
              { params: {
                  startIndex: 0,
                  maxResults: 40  
                }
              });

            // Get the necessary data for each book
            const items = response.data.items;
            let allCategories : string[] = ['All'];

            const newData = items.map((book:any) => {
              const {categories, imageLinks} = book.volumeInfo;
              const title = book.volumeInfo.title ? book.volumeInfo.title : '';
              const category = categories ? categories : [''];
              const authors = book.volumeInfo.authors ? book.volumeInfo.authors : [''];
              const imageUrl = imageLinks ? (imageLinks.thumbnail ? imageLinks.thumbnail : NO_COVER_IMAGE) : NO_COVER_IMAGE;
              const description = book.volumeInfo.description ? book.volumeInfo.description : ''; 
              const publishedDate = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : '';
              const pageCount = book.volumeInfo.pageCount ? book.volumeInfo.pageCount : '';
              allCategories = categories ? [...allCategories, ...categories] : allCategories;
              return {
                title,
                category,
                authors,
                imageUrl,
                description,
                publishedDate,
                pageCount
              }
            });

            // Delete duplicate categories
            const uniqueCategories = allCategories.filter((value, index, self) => {
              return self.indexOf(value) === index;
            })

            // Update the state
            dispatch({ type: FETCH_BOOKS_SUCCESS, payload: {newData, uniqueCategories}});
            dispatch({ type: UPDATE_SORTING, payload: 'Newest' });
          } catch (error:any) {
            dispatch({ type: UNSELECT_BOOK});
            dispatch({ type: FETCH_BOOKS_FAILURE, payload: error.message });
          }
    }
}