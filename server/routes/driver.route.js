import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createDriver, getDriver, updateDriver, deleteDriver, getUpdateDriver, checkDataExists, signIn, updateDriverPro,signOut } from '../controllers/driver.controller.js'

const routers = express.Router()

routers.post('/create', createDriver)
routers.get('/read', getDriver)
routers.put('/update/:id', updateDriver)
routers.delete('/delete/:id', deleteDriver)
routers.get('/get/:id', getUpdateDriver)
routers.get('/check', checkDataExists);
routers.post('/signin', signIn);
routers.post('/updatedri/:id',verifyToken,updateDriverPro);
routers.get('/signout', signOut)

export default routers