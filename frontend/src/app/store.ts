import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {usersReducer} from "../features/users/usersSlice.ts";
import {postsReducer} from "../features/posts/postsSlice.ts";
import {commentsReducer} from "../features/comments/commentsSlice.ts";
import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from "redux-persist";

const usersPersistConfig = {
    key: 'store:users',
    storage,
    whitelist: ['user'],
}

const rootReduser = combineReducers({
    posts: postsReducer,
    comments: commentsReducer,
    users: persistReducer(usersPersistConfig, usersReducer),
})

export const store = configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;