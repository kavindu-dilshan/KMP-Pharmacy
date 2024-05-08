import express from 'express'
import { addEmpoyeeSalary, getEmployeeSalary, updateEmployeeSalary, deleteEmployeeSalary, getUpdateEmployeeSalary } from '../controllers/employeeSalary.controller.js'

const routers = express.Router()

routers.post('/create', addEmpoyeeSalary)
routers.get('/read', getEmployeeSalary)
routers.put('/update/:id', updateEmployeeSalary)
routers.delete('/delete/:id', deleteEmployeeSalary)
routers.get('/get/:id', getUpdateEmployeeSalary)

export default routers