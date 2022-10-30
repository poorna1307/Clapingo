import {configureStore} from '@reduxjs/toolkit';
import adminLoginReducer from './slices/AdminSlice';
import studentLoginReducer from './slices/StudentSlice';

export const store=configureStore({
    reducer:{
        adminReducer : adminLoginReducer,
        studentReducer : studentLoginReducer
    }
})