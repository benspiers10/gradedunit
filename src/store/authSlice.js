import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Function to save data to localStorage
const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

// Async thunk for handling user signup
export const signup = createAsyncThunk('auth/signup', async ({username, password, email, role}, thunkAPI) => {
    try {
        // Make a POST request to the signup endpoint
        const res = await axios.post('http://localhost:8081/signup', {username, password, email, role});
        // Save token, username, role, and user ID to localStorage upon successful signup
        saveToLocalStorage("token", res.data.token);
        saveToLocalStorage("username", res.data.username);
        saveToLocalStorage("role", res.data.role);
        saveToLocalStorage("user_id", res.data.user_id);
        // Return the response data
        return res.data;
    } catch (err) {
        // Handle any errors by rejecting with the error message
        return thunkAPI.rejectWithValue(err.message);
    }
});

// Async thunk for handling user signin
export const signin = createAsyncThunk('auth/signin', async ({username, password}, thunkAPI) => {
    try {
        // Make a POST request to the signin endpoint
        const res = await axios.post('http://localhost:8081/signin', {username, password});
        // Save token, username, role, and user ID to localStorage upon successful signin
        saveToLocalStorage("token", res.data.token);
        saveToLocalStorage("username", res.data.username);
        saveToLocalStorage("role", parseInt(res.data.role)); // Convert role to integer before saving
        saveToLocalStorage("user_id", res.data.user_id);
        // Return the response data
        return res.data;
    } catch (err) {
        // Handle any errors by rejecting with the error message
        return thunkAPI.rejectWithValue(err.message);
    }
});

// Initial state for the auth slice
const initialState = {
    user: '',
    isLoggedIn: false,
    role: localStorage.getItem("role") ? parseInt(localStorage.getItem("role")) : null, // Parse role from localStorage to integer if it exists
    token: localStorage.getItem("token") || null, // Retrieve token from localStorage if it exists
    user_id: localStorage.getItem("user_id") || null, // Retrieve user ID from localStorage if it exists
    loading: false,
    error: null,
};

// Create a slice for authentication state management
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reducer for logging out the user
        logout: (state, action) => {
            state.user = '';
            state.role = null;
            state.token = null;
            state.user_id = null;
            state.isLoggedIn = false;
            state.loading = false;
            state.error = null;
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            localStorage.removeItem('user_id');
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle fulfilled state for signup
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload.username;
                state.role = +action.payload.role; // Convert role to a number using unary plus operator
                state.token = action.payload.token;
                state.user_id = action.payload.user_id;
                state.isLoggedIn = true;
                state.loading = false;
                state.error = null;
            })
            // Handle pending state for signup
            .addCase(signup.pending, (state, action) => {
                state.loading = true;
            })
            // Handle rejected state for signup
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = action.payload;
            })
            // Handle fulfilled state for signin
            .addCase(signin.fulfilled, (state, action) => {
                console.log('Action Payload:', action.payload); // Check if payload contains user_id
                state.user = action.payload.username;
                state.role = +action.payload.role; // Convert role to a number using unary plus operator
                state.token = action.payload.token;
                state.user_id = action.payload.user_id;
                state.isLoggedIn = true;
                state.loading = false;
                state.error = null;
            })
            // Handle pending state for signin
            .addCase(signin.pending, (state, action) => {
                state.loading = true;
            })
            // Handle rejected state for signin
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = action.payload;
            });
    }
});

// Export the logout action for use in components
export const { logout } = authSlice.actions;

// Export the reducer for use in the store
export default authSlice.reducer;
