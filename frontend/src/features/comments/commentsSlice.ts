import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createNewComment, fetchCommentsByIdPost} from "./commentsThunks.ts";
import {IComment} from "../../types";

interface CommentsState {
    items: IComment[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: CommentsState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
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

            .addCase(createNewComment.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createNewComment.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createNewComment.rejected, (state) => {
                state.createLoading = false;
            });
    }
});

export const commentsReducer = commentSlice.reducer;

export const selectComments = (state:  RootState) => state.comments.items;
export const selectCommentsFetchLoading = (state: RootState) => state.comments.fetchLoading;
