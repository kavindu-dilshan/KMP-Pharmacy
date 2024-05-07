import express from 'express'
import { createTask, getTask, updateTask, deleteTask, getUpdateTask, checkOrderID } from '../controllers/task.controller.js'

const routers = express.Router()

routers.post('/create', createTask);
routers.get('/read', getTask);
routers.put('/update/:id', updateTask);
routers.delete('/delete/:id', deleteTask);
routers.get('/get/:id', getUpdateTask);
routers.get('/checkorder', checkOrderID);

export default routers