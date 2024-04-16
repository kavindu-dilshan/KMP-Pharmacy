import express from 'express'
import { addEmpoyee, getEmployee, updateEmployee, deleteEmployee, getUpdateEmployee } from '../controllers/employee.controller.js'

const routers = express.Router()

routers.post('/create', addEmpoyee)
routers.get('/read', getEmployee)
routers.put('/update/:id', updateEmployee)
routers.delete('/delete/:id', deleteEmployee)
routers.get('/get/:id', getUpdateEmployee)

export default routers