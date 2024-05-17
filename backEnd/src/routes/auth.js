import { Router } from "express";
import {handleLogin,handleRegistration} from "../controller/authController.js";
const router = Router();

//login route
router.post('/login',handleLogin)

router.post('/register',handleRegistration)



export default router;