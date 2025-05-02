import {
    Grid,
    Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchAllPosts } from './postsThunks.ts';
import {selectPost, selectPostFetchLoading} from './postsSlice.ts';
import PostItem from "./PostItem/PostItem.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const Post = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPost);
    const fetchLoading = useAppSelector(selectPostFetchLoading);

    useEffect(() => {
        dispatch(fetchAllPosts());
    }, [dispatch]);

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ mt: 4 }}>
            <Grid size={{xs: 12, md: 10}}>
                {fetchLoading ? (
                    <Spinner />
                ) : posts.length === 0 ? (
                    <Typography variant="h4">No posts yet</Typography>
                ) : (
                    <Grid container spacing={2}>
                        {posts.map((post) => (
                            <PostItem
                                key={post._id}
                                id={post._id}
                                username={post.username}
                                title={post.title}
                                image={post.image || undefined}
                                datetime={post.datetime}
                            />
                        ))}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default Post;
