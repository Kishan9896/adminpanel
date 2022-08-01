import * as actionType from "./actionType"

const intival = {
    isLoding: false,
    Medicines: [],
    error: ""
}

export const MedicinesReducer = (state = intival, action) => {
    switch (action.type) {
        case actionType.GET_MEDICINES:
            return { ...state, Medicines : action.payload, isLoding : false, error: ""}
        case actionType.ADD_MEDICINES:
            return { ...state, Medicines : state.Medicines.concat(action.payload), isLoding : false, error: ""}
        case actionType.LOADING_MEDICINES:
            return { ...state, isLoding : true, error: "" }
        case actionType.ERROR_MEDICINES:
            return { ...state, isLoding : false, Medicines : [], error: action.payload}
        default :
            return state; 
            
    }
}