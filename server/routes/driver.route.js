import express from 'express'
import { verifyDriverToken } from '../utils/verifyDriver.js';
import { createDriver, getDriver, updateDriver, deleteDriver, getUpdateDriver, checkDataExists, signIn, updateDriverPro,signOut } from '../controllers/driver.controller.js'

const routers = express.Router()

routers.post('/create', createDriver)
routers.get('/read', getDriver)
routers.put('/update/:id', updateDriver)
routers.delete('/delete/:id', deleteDriver)
routers.get('/get/:id', getUpdateDriver)
routers.get('/check', checkDataExists);
routers.post('/signin', signIn);
routers.post('/updatedri/:id',verifyDriverToken,updateDriverPro);
routers.get('/signout', signOut)

export default routers