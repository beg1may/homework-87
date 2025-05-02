import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../users/usersSlice.ts";
import {CommentMutation} from "../../types";
import {createNewComment} from "./commentsThunks.ts";
import {toast} from "react-toastify";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import CommentForm from "./CommentForm/CommentForm.tsx";
import {selectOnePost} from "../posts/postsSlice.ts";

const CommentNew = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const post = useAppSelector(selectOnePost);


    const onCreateNewPost = async (comment: CommentMutation) => {
        try {
            await dispatch(createNewComment({
                description: comment.description,
                token: user?.token || '' ,
                post: comment.post || ''
            }));
            toast.success("Create new post!");
        } catch (e) {
            toast.error("Post was not successfully created");
            console.error(e);
        }
    }

    return (
        <Grid>
            <Typography variant="h4">
                Write a new comment to the post
            </Typography>
            <Typography variant="h6">
                Share your opinion, ask a question or leave a comment—your opinion matters!
            </Typography>
            {post && <CommentForm onSubmitComment={onCreateNewPost} post_id={post._id} />}
        </Grid>
    );
};

export default CommentNew;