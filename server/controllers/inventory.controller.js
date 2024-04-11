import Inventory from "../models/inventory.model.js"

const addInventoryTtem = async (req, res) => {
    try {
        const {medicineName, unitPrice, quantity, expirationDate, manufacturesDate, storageCondition, type,supplier} = req.body
        
        const newInventory = new Inventory({
            medicineName, unitPrice, quantity, expirationDate, manufacturesDate, storageCondition, type,supplier
        })
        await newInventory.save()
        res.status(200).json({success:true, message:'Item added to the inventory!', newInventory})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const getInventoryTtem = async(req, res) => {
    try {
        const inventory = await Inventory.find()
        if(!inventory) {
            return res.status(404).json({success:false, message:'Employee not found!'})
        }
        res.status(200).json({success:true, inventory})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const updateInventoryItem = async(req, res) => {
    try {
        const inventoryId = req.params.id
        const updateInventory = await Inventory.findByIdAndUpdate(inventoryId, req.body, {new:true})

        if(!updateInventory) {
            return res.status(404).json({success:false, message:'Item not found!'})
        }
        res.status(200).json({success:true, message:'Inventory Item Updated Successfully!', updateInventory})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const deleteInventoryItem = async (req, res) => {
    try {
        const inventoryId = req.params.id
        const deleteInventory = await Inventory.findByIdAndDelete(inventoryId)
        
        if(!deleteInventory) {
            return res.status(404).json({success:false, message:'Item not found!'})
        }
        res.status(200).json({success:true, message:'Item Deleted Successfully!', deleteInventory})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

export {addInventoryTtem, getInventoryTtem, updateInventoryItem, deleteInventoryItem}