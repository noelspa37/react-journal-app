import { types } from "../types/types"

export const uiSetError = (msgError) => {
    return {
        type: types.uiSetError,
        payload: msgError
    }
}

export const uiRemoveError = () => {
    return {
        type: types.uiRemoveError
        
    }
}