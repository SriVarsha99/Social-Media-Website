import express from 'express';
import {login,register,logout, getDataById} from "../controllers/auth.js"
const router = express.Router()
router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/getDataById", getDataById);

export default router