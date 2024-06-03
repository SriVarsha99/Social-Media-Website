import express from 'express';
import {requests, accept, decline, follow, status} from "../controllers/followers.js"
const router = express.Router()
router.post("/requests", requests)
router.post("/accept", accept)
router.post("/decline", decline)
router.post("/status", status)
router.post("/follow", follow)
router.post("/unfollow", decline)

export default router