import express from "express";
import auth from "../controller/auth"
const router = express.Router();
router.post('/createaccount', auth.postCreateAccount)
export default router;