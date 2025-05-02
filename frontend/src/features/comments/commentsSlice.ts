import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchCommentsByIdPost} from "./commentsThunks.ts";
import {IComment} from "../../types";

interface CommentsState {
    items: IComment[];
    fetchLoading: boolean;
}

const initialState: CommentsState = {
    items: [],
    fetchLoading: false,
}

export const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByIdPost.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchCommentsByIdPost.fulfilled, (state, {payload: comments}) => {
                state.items = comments;
                state.fetchLoading = false;
            })
            .addCase(fetchCommentsByIdPost.rejected, (state) => {
                state.fetchLoading = false;
            })
    }
});

export const commentsReducer = commentSlice.reducer;

export const selectComments = (state:  RootState) => state.comments.items;
export const selectCommentsFetchLoading = (state: RootState) => state.comments.fetchLoading;
