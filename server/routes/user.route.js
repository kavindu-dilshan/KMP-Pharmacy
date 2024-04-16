import express from 'express';
import { deleteUser, test, updateUser, getUsers, deleteAllUsers} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.delete('/deleteall/:id',  deleteAllUsers)
router.get('/read', getUsers )


export default router;