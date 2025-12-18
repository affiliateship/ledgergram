import { getAccountById } from "../data/dao/AccountDAO";
import { findAll } from "../data/dao/PostDAO";
import { Post } from "../data/entity/Post";
import { PostRequest } from "../data/model/PostRequest";
import { PostResponse } from "../data/model/PostResponse";
import logger from "../loader/logger";
import { likePost, savePostInFF } from "./FireFlyService";

export async function savePost(post: PostRequest) {
    try {
        const account = await getAccountById(post.userId);
        if (account) {
            return await savePostInFF(post);
        } else {
            throw new Error("Account does not exist with accountId: " + post.userId);
        }
    } catch (e) {
        logger.error(e.message);
        throw e;
    }
}

export async function getPosts() {
    try {
        const posts = await findAll();
        const postResponses = posts.map(mapToPostResponse);
        return postResponses;
    } catch (e) {
        logger.error(e.message);
        throw e;
    }
}

export async function updateLike(postId: number) {
    try {
        return await likePost(postId);
    } catch (e) {
        logger.error(e.message);
        throw e;
    }
}

function mapToPostResponse(post : Post) {
    const postResponse = new PostResponse();
    postResponse.postId = post.postId;
    postResponse.content = post.content;
    postResponse.likeCount = post.likeCount;
    postResponse.createdAt = post.createdAt;
    postResponse.transactionHash = post.transactionHash;
    postResponse.blockNumber = post.blockNumber;
    postResponse.username = post.account.username;
    postResponse.userId = post.account.accountId;
    return postResponse;
}