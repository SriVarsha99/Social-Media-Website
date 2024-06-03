import express from 'express';
import {requests, add, likes} from "../controllers/comments.js"
const router = express.Router()
router.get("/requests", requests)
router.post("/add", add)
router.get("/likes", likes)

export default router