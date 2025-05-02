import { Typography } from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {PostMutation} from "../../types";
import {toast} from "react-toastify";
import PostForm from "./PostForm/PostForm.tsx";
import {createPost} from "./postsThunks.ts";
import {selectUser} from "../users/usersSlice.ts";

const NewPost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);


    const onCreateNewPost = async (post: PostMutation) => {
        try {
            await dispatch(createPost({ postToAdd: post, token: user?.token || '' }));
            toast.success("Create new post!");
            navigate('/');
        } catch (e) {
            toast.error("Post was not successfully created");
            console.error(e);
        }
    }
    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px", marginTop: "30px"}}>
                New post
            </Typography>
            <PostForm onSubmitPost={onCreateNewPost}/>
        </>
    );
};

export default NewPost;