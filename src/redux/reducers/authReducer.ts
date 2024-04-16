import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    id: string,
    email: string,
    accesstoken: string,
}

const initialState: AuthState = {
    id: '',
    email: '',
    accesstoken: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action) => {state.authData = action.payload},
        removeAuth: (state, action) => {state.authData = initialState},
    }
});

export const authReducer = authSlice.reducer;
export const {addAuth, removeAuth} = authSlice.actions;
export const authSelector = (state: any) => state.authReducer.authData; 
 


// initialState là các cái giá trị ban đầu 
// reducers nó sẽ chứa các cái hàm để xử lý các cái moveuser hoặc là adduser hoặc edituser