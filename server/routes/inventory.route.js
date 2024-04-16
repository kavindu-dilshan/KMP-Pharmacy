import express from 'express'
import {getInventoryItem, addInventoryItem, updateInventoryItem, deleteInventoryItem,getItemToupdate} from '../controllers/inventory.controller.js'

const routers = express.Router()

routers.post('/create', addInventoryItem)
routers.get('/read', getInventoryItem)
routers.put('/update/:id', updateInventoryItem)
routers.get('/getsingleitem/:id', getItemToupdate)
routers.delete('/delete/:id', deleteInventoryItem)

export default routers