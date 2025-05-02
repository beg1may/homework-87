import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectComments, selectCommentsFetchLoading} from "./commentsSlice.ts";
import {useParams} from "react-router-dom";
import {fetchCommentsByIdPost} from "./commentsThunks.ts";
import {useEffect} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const Comments = () => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector(selectComments);
    const fetchLoading = useAppSelector(selectCommentsFetchLoading);

    const {id} = useParams();

    useEffect(() => {
        if(id) {
            dispatch(fetchCommentsByIdPost(id));
        }
    }, [id, dispatch]);

    return (
        <>
            <Typography variant="h4" marginTop='30px'>
               Comments:
            </Typography>
            {fetchLoading ? <Spinner/> : (
                <List>
                    {comments.length === 0 ? (
                        <Typography variant='h5'>No comments yet</Typography>
                    ) : (
                        comments.map(comment => (
                            <ListItem key={comment._id} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar><AccountCircleIcon/></Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={comment.username.username}
                                    secondary={
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{color: 'text.primary', display: 'inline'}}
                                        >
                                            {comment.description}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))
                    )}
                </List>
            )
            }
        </>
    );
};

export default Comments;