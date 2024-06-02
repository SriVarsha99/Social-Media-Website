import express from 'express';
import {requests, add} from "../controllers/comments.js"
const router = express.Router()
router.get("/requests", requests)
router.post("/add", add)

export default router