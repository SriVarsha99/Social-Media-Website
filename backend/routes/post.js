import express from 'express';
import {posts, comments, likes, addComment, addLike, feedPosts} from "../controllers/posts.js"
const router = express.Router()
router.post("/posts", posts)
router.get("/comments", comments)
router.get("/likes", likes)
router.get("/feedPosts", feedPosts)
router.post("/addComment", addComment)
router.post("/addLike", addLike)


export default router