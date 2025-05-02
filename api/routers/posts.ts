import express from "express";
import {Error} from "mongoose";
import Post from "../models/Post";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../middleware/multer";

const postsRouter = express.Router();

postsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.description && !req.body.image) {
            res.status(400).send({ error: 'Fill in either image or description' });
            return;
        }

        const user = (req as RequestWithUser).user;

        const post = new Post({
            username: user._id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? 'images/' + req.file.filename : null,
        });

        await post.save();
        res.send(post);
    } catch (error) {
        if(error instanceof  Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

postsRouter.get("/", async (req, res, next) => {
    try {
        const post = await Post.find().populate('username', 'username').sort({datetime: -1});
        res.send(post);
    } catch (error) {
        next(error);
    }
});

postsRouter.get("/:id", async (req, res, next) => {
    try {
        const _id  = req.params.id;
        const post = await Post.findById(_id).populate('username', 'username');

        if(!post) {
            res.status(404).send({message: 'Post not found'});
            return;
        }

        res.send(post);
    } catch (error) {
        next(error);
    }
});

export default postsRouter;