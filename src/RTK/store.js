import { configureStore } from "@reduxjs/toolkit";
import posts from "./postslice";
import auth from "./authslice";

const store = configureStore({
    reducer:{
         posts: posts,
         auth: auth
    }
 })

 export default store;