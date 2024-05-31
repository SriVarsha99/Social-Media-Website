import express from 'express';
import {posts, comments, likes} from "../controllers/home.js"
const router = express.Router()
router.get("/posts", posts)
router.get("/comments", comments)
router.get("/likes", likes)

export default router