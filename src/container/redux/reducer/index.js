import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import { MedicinesReducer } from "./Medicine.Reducer";


const rootReducer = combineReducers ({
    counter: counterReducer,
    Medicines: MedicinesReducer,
})

export default rootReducer;