export interface RegisterMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface Post {
    _id: string;
    username: {
        _id: string;
        username: string;
    }
    title: string;
    description: string;
    image: string | null;
    datetime: string;
}

export interface PostMutation {
    _id: string;
    title: string;
    description: string;
    image: File | null;
}

export interface IComment {
    _id: string;
    username: {
        _id: string;
        username: string;
    }
    post: string;
    description: string;
}

export interface CommentMutation{
    description: string;
    post: string;
}