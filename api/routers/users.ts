import express from "express";
import {Error, HydratedDocument} from "mongoose";
import User from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";
import {UserFields} from "../types";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();
        await user.save();
        res.send(user);
    } catch (error) {
        if(error instanceof  Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

usersRouter.post('/session', async (req, res, next) => {
    try {
        if(!req.body.username || !req.body.password) {
            res.status(401).send({error: 'Username and password are required'});
            return;
        }

        const user = await User.findOne({username: req.body.username});

        if(!user) {
            res.status(401).send({error: 'Username not found.'});
            return;
        }

        const isMath = await user.checkPassword(req.body.password);

        if(!isMath) {
            res.status(401).send({error: 'Password is incorrect'});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({message: 'Username and password is correct', user});
    } catch (error) {
        next(error);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
    const token = req.get('Authorization');

    if(!token){
        res.send({message: 'Success logout'});
        return;
    }

    try {
        const user = await User.findOne({token});

        if(user) {
            user.generateToken();
            await user.save();
        }

        res.send({message: 'Success logout'});
    } catch (e) {
        next(e);
    }
});

export default usersRouter;