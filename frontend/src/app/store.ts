import {configureStore} from "@reduxjs/toolkit";
import {usersReducer} from "../features/users/usersSlice.ts";
import {postsReducer} from "../features/posts/postsSlice.ts";
import {commentsReducer} from "../features/comments/commentsSlice.ts";

export const store = configureStore({
    reducer:{
        users: usersReducer,
        posts: postsReducer,
        comments: commentsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;