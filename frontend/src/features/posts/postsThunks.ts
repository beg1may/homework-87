import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Post} from "../../types";

export const fetchAllPosts = createAsyncThunk<Post[], void>(
    'posts/fetchAllPosts',
    async () => {
        const response = await axiosApi.get<Post[]>('/posts');
        return response.data;
    }
);