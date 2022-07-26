import * as actionType from "./actionType"

const intival = {
    isLoding: false,
    Medicines: []
}

export const MedicinesReducer = (state = intival, action) => {
    switch (action.type) {
        case actionType.GET_MEDICINES:
            return { ...state, Medicines : action.payload }
        default :
            return state; 
            
    }
}