import rootReducers from "../reducers/index"
import { configureStore } from "@reduxjs/toolkit"

export default configureStore({reducer: rootReducers})
//creating and exporting a store. Here we're passing the combined reducers to the configureStore function.
