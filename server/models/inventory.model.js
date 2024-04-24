import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {

    Mname: { 
      type: String,
      required: true,
    },

    Mprice: {
      type: Number,
      required: true,
    },
    Mquantity: {
      type: Number,
      required: true,
    },

    Msupplier: {
      type: String,
      required: true,
    },

    expirAt: {
        type:Date,
        required: true,
    },

    manuAt: {
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

    status: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
      

  },
  { timestamps: true }
);

const Inventory = mongoose.model('Inventory', inventorySchema);  //Create model

export default Inventory;