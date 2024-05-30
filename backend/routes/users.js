import express from 'express';
import {getUser, users} from "../controllers/user.js"
const router = express.Router()
router.get("/find/:user_id",getUser)
router.get("/", users)

export default router