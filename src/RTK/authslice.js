import { createSlice } from "@reduxjs/toolkit";


const authslice = createSlice({
    name:'auth',
    initialState: {   id:1 , islogedin: true },
    reducers: {
        LogOnOut: (state) => {
            state.islogedin = !state.islogedin
       }
    }
})

export const {LogOnOut} = authslice.actions; 
export default authslice.reducer;