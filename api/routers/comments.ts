import express from "express";
import Comment from "../models/Comments";
import auth, {RequestWithUser} from "../middleware/auth";
import {Error} from "mongoose";

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
        if(error instanceof  Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

commentsRouter.get("/", async (req, res, next) => {
    try {
        const filter: {[key: string]: string} = {};

        if(req.query.post) {
            filter['post'] = String(req.query.post);
        }

        const comment = await Comment.find(filter).populate("username", "username");
        res.send(comment);
    } catch (error) {
        next(error);
    }
})

export default commentsRouter;