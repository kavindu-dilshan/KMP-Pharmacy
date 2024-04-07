import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {

    medicineName: { 
      type: String,
      required: true,
    },

    unitPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    expirationDate: {
        type:Date,
        required: true,
    },

    manufacturesDate: {
        type:Date,
        required: true,
    },

    storageCondition: {
        type:String,
        required:true,
    },
    type: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const Inventory = mongoose.model('Inventory', inventorySchema);  //Create model

export default Inventory;