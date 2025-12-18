import express from "express";
import { PostRequest } from "../data/model/PostRequest";
import logger from "../loader/logger";
import { getPosts, savePost, updateLike } from "../service/PostService";


export async function createPost(req: express.Request, res: express.Response) {
    try {
        const post: PostRequest = new PostRequest();
        post.userId = req.body.userId;
        post.content = req.body.content;
        const address = await savePost(post);
        res.status(201).send({
            id: address
        });
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({
            error: e.message,
        });
    }
}

export async function getFeed(req: express.Request, res: express.Response) {
    try {
        const posts = await getPosts();
        res.status(200).send({
            posts
        });
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({
            error: e.message,
        });
    }
}

export async function like(req: express.Request, res: express.Response) {
    try {
        const postId = req.params.postId;
        const posts = await updateLike(Number(postId));
        res.status(201).send({
            posts
        });
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({
            error: e.message,
        });
    }
}