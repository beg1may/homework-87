import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Post, PostMutation} from "../../types";
import {RootState} from "../../app/store.ts";

export const fetchAllPosts = createAsyncThunk<Post[], void>(
    'posts/fetchAllPosts',
    async () => {
        const response = await axiosApi.get<Post[]>('/posts');
        return response.data;
    }
);

export const fetchPostById = createAsyncThunk<Post, string>(
    'posts/fetchPostById',
    async (post_id) => {
        const response = await axiosApi.get(`/posts/${post_id}`);
        return response.data || null;
    }
)


export const createPost = createAsyncThunk<void, PostMutation, { state: RootState }>(
    'posts/createPost',
    async (postToAdd,{getState}) => {
        const token = getState().users.user?.token;
        const formData = new FormData();

        formData.append('title', postToAdd.title);
        formData.append('description', postToAdd.description);

        if (postToAdd.image) {
            formData.append('image', postToAdd.image);
        }

        await axiosApi.post('/posts', formData, {
            headers: {
                'Authorization': token,
            },
        });

    }
);

