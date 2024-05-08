import express from 'express';
import { google, signOut, signin, signup,signinEmp,signoutEmp } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signupEmp", signinEmp);
router.post("/signin", signin);
router.post('/google', google);
router.get('/signout', signOut)
router.get('/signoutEmp', signoutEmp)

export default router;