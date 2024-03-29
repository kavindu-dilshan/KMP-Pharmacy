import express from 'express'
import { addEmpoyee, getEmployee, updateEmployee, deleteEmployee } from '../controllers/employee.controller.js'

const routers = express.Router()

routers.post('/create', addEmpoyee)
routers.get('/read', getEmployee)
routers.put('/update/:id', updateEmployee)
routers.delete('/delete/:id', deleteEmployee)

export default routers