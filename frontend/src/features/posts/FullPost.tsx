import {Card, CardActionArea, CardContent, CardMedia, Container, Typography} from "@mui/material";
import {selectOnePost, selectPostFetchLoading} from "./postsSlice.ts";
import {useAppDispatch, useAppSelector } from "../../app/hooks";
import {useParams} from "react-router-dom";
import { useEffect } from "react";
import {fetchPostById} from "./postsThunks.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {apiUrl} from "../../../globalConstants.ts";
import MessageIcon from "@mui/icons-material/Message";
import Grid from "@mui/material/Grid";
import Comments from "../comments/Comments.tsx";
import {selectUser} from "../users/usersSlice.ts";
import CommentNew from "../comments/CommentNew.tsx";


const FullPost = () => {
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectOnePost);
    const fetchLoading = useAppSelector(selectPostFetchLoading);
    const user = useAppSelector(selectUser);

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(id));
        }
    }, [id, dispatch]);
    return (
        <Container maxWidth="md">
            {fetchLoading ? (
                <Spinner />
                ) : post ? (
                <Grid direction="column" spacing={2}>
                    <Grid container spacing={2} sx={{ margin: '20px 0' }}>
                        <Grid size={{xs: 12, md: 7}}>
                            <Card>
                                <CardActionArea>
                                    {post.image ? (
                                        <CardMedia
                                            component="img"
                                            image={apiUrl + '/' + post.image}
                                            alt={post.title}
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    ) : (
                                        <MessageIcon
                                            sx={{
                                                width: '60%',
                                                height: '60%',
                                                color: '#9e9e9e',
                                                fontSize: 'unset',
                                            }}
                                        />
                                    )}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {post.title}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {post.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>

                        {user && (
                            <Grid size={{xs: 12, md: 5}}>
                                <CommentNew />
                            </Grid>
                        )}
                    </Grid>
                    <Comments />
                </Grid>
            ) : (
                <Typography variant="h6">Not found post</Typography>
            )}
        </Container>
    );
};

export default FullPost;