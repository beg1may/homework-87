import {
    Grid,
    Typography,
    Card,
    CardMedia, CardContent, Box
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchAllPosts } from './postsThunks.ts';
import {selectPost} from './postsSlice.ts';
import dayjs from 'dayjs';

const Post = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPost);

    useEffect(() => {
        dispatch(fetchAllPosts());
    }, [dispatch]);

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ mt: 4 }}>
            <Grid size={{xs:12, md:10}}>
            {posts.length === 0 ? (
                    <Typography variant="h4">No posts yet</Typography>
                ) : (
                    <Grid container spacing={2}>
                        {posts.map(post => (
                            <Grid size={12} key={post._id}>
                                <Card>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        {post.image && (
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={post.image}
                                                alt={post.title}
                                            />
                                        )}
                                        <Grid>
                                            <CardContent>
                                                <Typography variant="subtitle1" component="div">{dayjs(post.datetime).format('YYYY-MM.DD HH:mm')} by {post.username.username}</Typography>
                                            </CardContent>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: 'text.secondary',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    width: '140px'
                                                }}
                                            >
                                                {post.title}
                                            </Typography>
                                        </Grid>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default Post;
