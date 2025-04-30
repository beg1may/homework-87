import express from "express";
import Comment from "../models/Comments";
import auth, {RequestWithUser} from "../middleware/auth";

const commentsRouter = express.Router();

commentsRouter.post("/", auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const comments = new Comment ({
            username: user._id,
            post: req.body.post,
            description: req.body.description,
        });

        await comments.save();
        res.send(comments);
    } catch (error) {
        next(error);
    }
});

export default commentsRouter;