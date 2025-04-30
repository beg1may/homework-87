import mongoose, {Schema, Types} from "mongoose";
import User from "./User";

const PostSchema = new mongoose.Schema({
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
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: String,
    image: String,
    datetime: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;