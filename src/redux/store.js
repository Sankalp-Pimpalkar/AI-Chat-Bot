import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import chatSessionsReducer from "./reducers/chatSessionsReducer";

const store = configureStore({
    reducer: {
        authReducer,
        chatSessionsReducer
    }
})

export default store