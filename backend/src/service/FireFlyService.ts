
import config from "../../config.json";
import { PostRequest } from "../data/model/PostRequest";
import { firefly } from "../loader/firefly";
import logger from "../loader/logger";

const postApiName: string = `postApi-${config.VERSION}`;

export async function savePostInFF(post: PostRequest) {
    try {
        const result = await firefly.invokeContractAPI(postApiName, "createPost", {
            input: {
            userId: post.userId,
            content: post.content
            },
            key: config.SIGNING_KEY,
        });
        logger.info("New Post created with address: " + result.id);
        return post;
    } catch (e) {
        logger.error(e.message);
        throw e;
    }
}

export async function likePost(postId: number) {
    try {
        const result = await firefly.invokeContractAPI(postApiName, "likePost", {
            input: {
            postId: postId
            },
            key: config.SIGNING_KEY,
        });
        logger.info("Post with postId: " + postId + " updated by firefly!");
        return result.id;
    } catch (e) {
        logger.error(e.message);
        throw e;
    }
}

export async function queryPost() {
    try {
        return await firefly.queryContractAPI(postApiName, "getPost", {
            key: config.SIGNING_KEY,
        })
    } catch (e) {
        logger.error(e.message);
        throw e;
    }
}
