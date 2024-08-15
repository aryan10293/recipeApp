import express from "express";
import auth from "../controller/auth"
const router = express.Router();
router.post('/createaccount', auth.postCreateAccount)
router.post('/login', auth.postLogin)
export default router;