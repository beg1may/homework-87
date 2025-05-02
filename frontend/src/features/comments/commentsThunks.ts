import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {IComment} from "../../types";
import {RootState} from "../../app/store.ts";

export const fetchCommentsByIdPost = createAsyncThunk<IComment[], string>(
    'comments/fetchCommentsByIdPost',
    async (post_id) => {
        const response = await axiosApi.get<IComment[]>(`/comments?post=${post_id}`);
        return response.data;
    }
)

export const createNewComment = createAsyncThunk<IComment, {description: string, post: string}, { state: RootState }>(
    'comments/createNewComment',
    async ({description, post}, {getState}) => {
        const token = getState().users.user?.token;
        const response = await axiosApi.post('/comments', {description, post}, {
            headers: {
                'Authorization': token,
            },
        });
        return response.data;
    }
)