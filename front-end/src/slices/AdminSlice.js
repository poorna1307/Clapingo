import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const adminLogin = createAsyncThunk("adminLogin", async (adminLoginDetails, thunkApi) => {
    console.log("hello")
    let response = await axios.post('http://localhost:5000/admin-api/adminlogin', adminLoginDetails);
    let data = response.data;
    console.log(data);
    if (data.message === "Login success") {
        localStorage.setItem("loginToken", data.payload);
        return data.userdata;
    }
    if (data.message === "Invalid users" || data.message === "Invalid password") {
        return thunkApi.rejectWithValue(data);
    }
})

const adminLoginSlice = createSlice({
    name: "adminLoginData",
    initialState: {
        adminObj: {},
        isPending: false,
        isFulfilled: false,
        isRejected: false,
        errMsg: ''
    },
    reducers: {
        clearLoginStatus: (state) => {
            state.userObj = null;
            state.isPending = false;
            state.isFulfilled = false;
            state.isRejected = false;
            state.errMsg = '';
            return state;
        }
    },
    extraReducers: {
        [adminLogin.pending]: (state) => {
            state.isPending = true
        },
        [adminLogin.fulfilled]: (state, action) => {
            state.userObj = action.payload;
            state.isFulfilled = true;
            state.isRejected = false;
            state.isPending = false;
            state.errMsg = '';
        },
        [adminLogin.rejected]: (state, action) => {
            state.isRejected = true;
            state.isPending = false;
            state.isFulfilled = false;
            state.errMsg = action.message;
        }
    }
});
export const { clearLoginStatus } = adminLoginSlice.actions;
export default adminLoginSlice.reducer;