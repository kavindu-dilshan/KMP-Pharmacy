import express from 'express'
import { addEmpoyeeLeave, getEmployeeLeave, updateEmployeeLeave, deleteEmployeeLeave, getUpdateEmployeeLeave } from '../controllers/employeeLeave.controller.js'

const routers = express.Router()

routers.post('/create', addEmpoyeeLeave)
routers.get('/read', getEmployeeLeave)
routers.put('/update/:id', updateEmployeeLeave)
routers.delete('/delete/:id', deleteEmployeeLeave)
routers.get('/get/:id', getUpdateEmployeeLeave)

export default routers