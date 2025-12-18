import logger from "../../loader/logger";
import { dataSource } from "../db/Datasource";
import { Post } from "../entity/Post";

    
export async function savePost(post: Post): Promise<Post> {
    try {
        const result: Post = await dataSource!.getRepository(Post).save(post);
        return result;
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

export async function findAll() {
    try {
      return await dataSource
        .getRepository(Post)
        .find({
          relations: {
            account: true,
          },
          order: {
            createdAt: "DESC",
          },
        });
    } catch (e) {
      logger.error(e);
      throw e;
    }
}

export async function updatePost(postId: number, likeCount: number) {
    try {
        await dataSource!.manager!
        .createQueryBuilder()
        .update(Post)
        .set({likeCount: likeCount})
        .where("post_id = :postId", {postId: postId})
        .execute();
    } catch (e) {
        logger.error(e);
        throw e;
    }
}