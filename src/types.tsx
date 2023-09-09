export type BookType = {
    title: string,
    category: string[],
    authors: string[],
    imageUrl: string,
    description: string,
    publishedDate: string,
    pageCount: number
}

export interface ActionType {
    type: string,
    payload: any
}

export interface BookProps{
    book: BookType,
}

export interface StateType {
    input: string,
    isLoading: boolean,
    fetchedBooks: BookType[],
    displayedBooks: BookType[],
    allCategories: string[],
    selectedCategory: string,
    sortedBy: string,
    isDataFetched: boolean,
    isDataFailed: boolean,
    selectedBook: any
}

export interface AppState {
    search: StateType
}