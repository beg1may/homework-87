import {Post} from "../../types";
import {RootState} from "../../app/store.ts";
import {fetchAllPosts} from "./postsThunks.ts";
import { createSlice } from '@reduxjs/toolkit';

interface PostsState {
    items: Post[];
    fetchLoading: boolean;
}

const initialState: PostsState = {
    items: [],
    fetchLoading: false,
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllPosts.fulfilled, (state, {payload: post}) => {
                state.items = post;
                state.fetchLoading = false;
            })
            .addCase(fetchAllPosts.rejected, (state) => {
                state.fetchLoading = false;
            })
    }
});

export const postsReducer = postsSlice.reducer;

export const selectPost = (state: RootState) => state.posts.items;