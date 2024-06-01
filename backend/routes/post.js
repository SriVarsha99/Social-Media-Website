import express from 'express';
import {sharePost ,posts, comments, likes, addComment, addLike} from "../controllers/posts.js"
const router = express.Router()
router.post("/posts", posts)
router.get("/comments", comments)
router.get("/likes", likes)
router.post("/addComment", addComment)
router.post("/addLike", addLike)
router.post("/share", sharePost);


export default router