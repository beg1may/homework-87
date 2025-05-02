import { Typography } from "@mui/material";
import {useAppDispatch} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {PostMutation} from "../../types";
import {toast} from "react-toastify";
import PostForm from "./PostForm/PostForm.tsx";
import {createPost} from "./postsThunks.ts";

const NewPost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const onCreateNewPost = async (post: PostMutation) => {
        try {
            await dispatch(createPost(post));
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