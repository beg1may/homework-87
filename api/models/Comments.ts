import mongoose, {Schema, Types} from "mongoose";
import User from "./User";
import Post from "./Post";

const CommentSchema = new mongoose.Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return !!user;
            },
            message: "User not found",
        }
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post is required'],
        validate: {
            validator: async (value: Types.ObjectId) => {
                const post = await Post.findById(value);
                return !!post;
            },
            message: "Post not found",
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    }
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
