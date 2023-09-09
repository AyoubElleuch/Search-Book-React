import { UPDATE_SELECTED_CATEGORY } from "../constants"

export const updateSelectedCategory = (selectedCategory:string) => {
    return{
        type: UPDATE_SELECTED_CATEGORY,
        payload: selectedCategory
    }
}