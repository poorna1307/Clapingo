import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const studentLogin = createAsyncThunk("adminLogin", async (studentLoginDetails, thunkApi) => {
    let response = await axios.post('http://localhost:5000/student-api/studentlogin', studentLoginDetails);
    let data = response.data;
    console.log(data);
    if (data.message === "Login success") {
        localStorage.setItem("loginToken", data.payload);
        return data.studentData;
    }
    if (data.message === "Invalid users" || data.message === "Invalid password") {
        return thunkApi.rejectWithValue(data);
    }
})

const studentLoginSlice = createSlice({
    name: "studentLoginData",
    initialState: {
        studentObj: {},
        isPending: false,
        isFulfilled: false,
        isRejected: false,
        errMsg: ''
    },
    reducers: {
        clearLoginStatus: (state) => {
            state.studentObj = null;
            state.isPending = false;
            state.isFulfilled = false;
            state.isRejected = false;
            state.errMsg = '';
            return state;
        },
        addFavTeacher: (state, action) => {
            if (state.studentObj.favoriteteacher.includes(action.payload) === false)
                state.studentObj.favoriteteacher.push(action.payload);
        },
        remFavTeacher: (state, action) => {
            state.studentObj.favoriteteacher = state.studentObj.favoriteteacher.filter((favteacher) => favteacher !== action.payload)

        }
    },
    extraReducers: {
        [studentLogin.pending]: (state) => {
            state.isPending = true
        },
        [studentLogin.fulfilled]: (state, action) => {
            state.studentObj = action.payload;
            state.isFulfilled = true;
            state.isRejected = false;
            state.isPending = false;
            state.errMsg = '';
        },
        [studentLogin.rejected]: (state, action) => {
            state.isRejected = true;
            state.isPending = false;
            state.isFulfilled = false;
            state.errMsg = action.message;
        }
    }
});
export const { clearLoginStatus, addFavTeacher, remFavTeacher } = studentLoginSlice.actions;
export default studentLoginSlice.reducer;