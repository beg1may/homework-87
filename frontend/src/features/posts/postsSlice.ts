import {Post, PostMutation} from "../../types";
import {RootState} from "../../app/store.ts";
import {createPost, fetchAllPosts, fetchPostById} from "./postsThunks.ts";
import { createSlice } from '@reduxjs/toolkit';

interface PostsState {
    items: Post[];
    item: PostMutation | null;
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: PostsState = {
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
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
            .addCase(fetchAllPosts.fulfilled, (state, {payload: posts}) => {
                state.items = posts;
                state.fetchLoading = false;
            })
            .addCase(fetchAllPosts.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(fetchPostById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchPostById.fulfilled, (state, {payload: post}) => {
                state.item = post;
                state.fetchLoading = false;
            })
            .addCase(fetchPostById.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(createPost.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createPost.rejected, (state) => {
                state.createLoading = false;
            });
    }
});

export const postsReducer = postsSlice.reducer;

export const selectPost = (state: RootState) => state.posts.items;
export const selectOnePost = (state: RootState) => state.posts.item;
export const selectPostFetchLoading = (state: RootState) => state.posts.fetchLoading;