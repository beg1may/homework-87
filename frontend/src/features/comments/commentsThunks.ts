import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {IComment} from "../../types";

export const fetchCommentsByIdPost = createAsyncThunk<IComment[], string>(
    'comments/fetchCommentsByIdPost',
    async (post_id) => {
        const response = await axiosApi.get<IComment[]>(`/comments?post=${post_id}`);
        return response.data;
    }
)

export const createNewComment = createAsyncThunk<IComment, {description: string, token: string, post: string}>(
    'comments/createNewComment',
    async ({description, token, post}) => {
        const response = await axiosApi.post('/comments', {description, post}, {
            headers: {
                'Authorization': token,
            },
        });
        return response.data;
    }
)