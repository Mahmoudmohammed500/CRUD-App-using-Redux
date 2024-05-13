import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchposts = createAsyncThunk("posts/fetchposts", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await fetch("https://json-server-for-crud-app-using-redux.onrender.com/posts"); // this is the local json server url http://localhost:9000/posts
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchpost = createAsyncThunk("posts/fetchpost", async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await fetch(`https://json-server-for-crud-app-using-redux.onrender.com/posts/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertpost = createAsyncThunk("posts/insertpost", async (post, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    // const { auth } = getState()  
    //post.userid = auth.id;   we can use this way to get glopal state from redux or the next way
    post.userid = getState().auth.id
    try {
        const res = await fetch("https://json-server-for-crud-app-using-redux.onrender.com/posts", {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(post)
        })
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const editpost = createAsyncThunk("posts/editpost", async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await fetch(`https://json-server-for-crud-app-using-redux.onrender.com/posts/${item.id}`, {
            method: "put",  // When we edit using method patch or put 
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(item)
        })
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const deletepost = createAsyncThunk("posts/deletepost", async (item, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
        await Swal.fire({
            title: `Are you sure you want to delete : "${item.title}" ? `,
            showCancelButton: true
        }).then((data) => {
            if (data.isConfirmed) {
                fetch(`https://json-server-for-crud-app-using-redux.onrender.com/posts/${item.id}`, {
                    method: "delete",
                    Headers: {
                        "Content-type": "Aplication/json"
                    }
                })
            } else {
                // This Statement execute if cancel  button is clicked
                dispatch(fetchposts());
            }
        })
        // const data = await res.json();
        // return data;
        // We hash the previous 2 statements because no response from this server so we use the next statement instead}
        return item;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})
const initialState = { records: [], loading: false, error: null, record: null };
const postslice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        CleanRecord: (sate) => {
            sate.record = null
        }
    },
    extraReducers: (builder) => {
        // Fetchposts methods
        builder.addCase(fetchposts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchposts.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload; // OR  state.records.push(...action.payload);
            // return action.payload;    this statement get an error 
        });
        builder.addCase(fetchposts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; // OR  state.error.push(...action.payload);
            // return action.payload;    this statement get an error 
        });
        // Fetchpost methods
        builder.addCase(fetchpost.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchpost.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload; // OR  state.record.push(...action.payload);
            // return action.payload;    this statement get an error 
        });
        builder.addCase(fetchpost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; // OR  state.error.push(...action.payload);
            // return action.payload;    this statement get an error 
        });
        // Insertpost methods
        builder.addCase(insertpost.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(insertpost.fulfilled, (state, action) => {
            state.loading = false;
            // return action.payload;    this statement get an error 
            //   const postclone = { ...action.payload }  
            //    state.records.push(postclone);
            //... we can use the previous 2 statement or use the next statement to push data into state
            state.records = action.payload;
        });
        builder.addCase(insertpost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // Edit post methods
        builder.addCase(editpost.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(editpost.fulfilled, (state, action) => {
            state.loading = false;
            // return action.payload;    this statement get an error 
            //   const postclone = { ...action.payload }  
            //    state.records.push(postclone);
            //... we can use the previous 2 statement or use the next statement to push data into state
            state.records = action.payload;
        });
        builder.addCase(editpost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // Deletepost methods
        builder.addCase(deletepost.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deletepost.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter((record) => record.id != action.payload.id)
            // return action.payload;    this statement get an error 
        });
        builder.addCase(deletepost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    }
});

export default postslice.reducer;