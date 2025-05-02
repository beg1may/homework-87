import {Card, CardActionArea, CardContent, CardMedia, Container, IconButton, Typography} from "@mui/material";
import {selectOnePost, selectPostFetchLoading} from "./postsSlice.ts";
import {useAppDispatch, useAppSelector } from "../../app/hooks";
import {NavLink, useParams} from "react-router-dom";
import { useEffect } from "react";
import {fetchPostById} from "./postsThunks.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {apiUrl} from "../../../globalConstants.ts";
import MessageIcon from "@mui/icons-material/Message";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from "@mui/material/Grid";
import Comments from "../comments/Comments.tsx";


const FullPost = () => {
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectOnePost);
    const fetchLoading = useAppSelector(selectPostFetchLoading);

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(id));
        }
    }, [id, dispatch]);
    return (
        <Container maxWidth="md">
            {fetchLoading ? <Spinner/> : null}

            {!fetchLoading && post ?
                <Grid>
                    <Card sx={{ width: "100%", margin: "20px auto" }}>
                        <CardActionArea>
                            {post.image ? (
                                <CardMedia
                                    component="img"
                                    image={apiUrl + '/' + post.image}
                                    alt={post.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
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
                            <IconButton component={NavLink} to='/'>
                                <ArrowBackIcon sx={{fontSize: "25px"}}/>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: "20px" }}>
                                    Go back home
                                </Typography>
                            </IconButton>
                        </CardActionArea>
                    </Card>
                    <Comments />
                </Grid>
                :
                <Typography variant="h6">Not found post</Typography>
            }
        </Container>
    );
};

export default FullPost;