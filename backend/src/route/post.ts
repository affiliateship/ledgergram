import express from 'express';
import { createPost, getFeed, like } from '../controller/post';

export const router: express.IRouter = express.Router();

router.post("/posts", createPost);
router.put("/posts/:postId", like)
router.get("/posts", getFeed)