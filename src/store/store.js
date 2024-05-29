import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

// Create the Redux store with the authSlice reducer
export const store = configureStore({
    reducer: {
        auth: authSlice // Include the authSlice reducer under the 'auth' key
    }
});
