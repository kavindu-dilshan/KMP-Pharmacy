import express from 'express'
import {addInventoryTtem, getInventoryTtem, updateInventoryItem, deleteInventoryItem} from '../controllers/inventory.controller.js'

const routers = express.Router()

routers.post('/create', addInventoryTtem)
routers.get('/read', getInventoryTtem)
routers.put('/update/:id', updateInventoryItem)
routers.delete('/delete/:id', deleteInventoryItem)

export default routers