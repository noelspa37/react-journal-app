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

export const startLoading = () => {
    return {
        type: types.uiStartLoading
    }
}

export const finishLoading = () => {
    return {
        type: types.uiFinishLoading
    }
}