import express from 'express';
import {login,register,logout, getDataById, getFriendsById} from "../controllers/auth.js"
const router = express.Router()
router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/getDataById", getDataById);
router.post("/getFriendsById",getFriendsById)

export default router