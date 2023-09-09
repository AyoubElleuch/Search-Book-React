import { UPDATE_SORTING } from "../constants"

export const updateSorting = (sortedBy:string) => {
    return {
        type: UPDATE_SORTING,
        payload: sortedBy
    }
}