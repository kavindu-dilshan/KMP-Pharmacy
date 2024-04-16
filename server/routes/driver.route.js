import express from 'express'
import { createDriver, getDriver, updateDriver, deleteDriver, getUpdateDriver, checkDataExists, signIn } from '../controllers/driver.controller.js'

const routers = express.Router()

routers.post('/create', createDriver)
routers.get('/read', getDriver)
routers.put('/update/:id', updateDriver)
routers.delete('/delete/:id', deleteDriver)
routers.get('/get/:id', getUpdateDriver)
routers.get('/check', checkDataExists);
routers.post('/signin', signIn);


export default routers