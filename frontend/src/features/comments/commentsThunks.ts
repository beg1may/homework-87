import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {IComment} from "../../types";

export const fetchCommentsByIdPost = createAsyncThunk<IComment[], string>(
    'comments/fetchAllComments',
    async (post_id) => {
        const response = await axiosApi.get<IComment[]>(`/comments?post=${post_id}`);
        return response.data;
    }
)