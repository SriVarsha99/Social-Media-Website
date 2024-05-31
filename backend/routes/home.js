import express from 'express';
import {posts, comments} from "../controllers/home.js"
const router = express.Router()
router.get("/posts", posts)
router.post("/comments", comments)

export default router