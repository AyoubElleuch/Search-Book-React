import { BookType } from "../../types";
import { SELECT_BOOK, UNSELECT_BOOK } from "../constants";

export const selectBook = (book:BookType) => {
    return {
        type: SELECT_BOOK,
        payload: book
    }
}

export const unselectBook = () => {
    return {
        type: UNSELECT_BOOK
    }
}