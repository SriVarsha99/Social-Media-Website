import express from 'express';
import {requests, accept, decline} from "../controllers/followers.js"
const router = express.Router()
router.get("/requests", requests)
router.post("/accept", accept)
router.post("/decline", decline)

export default router