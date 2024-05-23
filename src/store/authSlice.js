import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

export const signup = createAsyncThunk('auth/signup', async({username, password, email, role}, thunkAPI) => {
    try {
        const res = await axios.post('http://localhost:8081/signup', {username, password, email, role});
        // Save token, username, and role to localStorage upon successful signup
      saveToLocalStorage("token", res.data.token);
      saveToLocalStorage("username", res.data.username);
      saveToLocalStorage("role", res.data.role);
      saveToLocalStorage("user_id", res.data.user_id);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const signin = createAsyncThunk('auth/signin', async({username, password}, thunkAPI) => {
    try {
        const res = await axios.post('http://localhost:8081/signin', {username, password});
        saveToLocalStorage("token", res.data.token);
        saveToLocalStorage("username", res.data.username);
        saveToLocalStorage("role", parseInt(res.data.role));
        saveToLocalStorage("user_id", res.data.user_id);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
})

const initialState = {
    user: '',
    isLoggedIn: false,
    role: localStorage.getItem("role") ? parseInt(localStorage.getItem("role")) : null, // Parse role from localStorage to integer
    token: localStorage.getItem("token") || null,
    user_id: localStorage.getItem("user_id") || null, // Retrieve user ID from localStorage
    loading: false,
    error: null,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = ''
            state.role = null
            state.token = null
            state.user_id = null
            state.isLoggedIn = false
            state.loading = false
            state.error = null
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            localStorage.removeItem('user_id');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload.username
                state.role = +action.payload.role
                state.token = action.payload.token;
                state.user_id = action.payload.user_id
                state.isLoggedIn = true
                state.loading = false
                state.error = null
            })
            .addCase(signup.pending, (state, action) => {
                state.loading =  true
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading =  false
                state.isLoggedIn = false
                state.error = action.payload
            })    


            .addCase(signin.fulfilled, (state, action) => {
                console.log('Action Payload:', action.payload); // Check if payload contains user_id
                state.user = action.payload.username;
                state.role = +action.payload.role; // Convert role to a number using unary plus operator
                state.token = action.payload.token;
                state.user_id = action.payload.user_id; // Ensure this is correct
                state.isLoggedIn = true;
                state.loading = false;
                state.error = null;
            })
            
            .addCase(signin.pending, (state, action) => {
                state.loading =  true
            })
            .addCase(signin.rejected, (state, action) => {
                state.loading =  false
                state.isLoggedIn = false
                state.error = action.payload
            })    
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer