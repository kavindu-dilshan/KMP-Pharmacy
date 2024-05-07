import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    orderId: {
      type:String,
      required: true,
      unique: true,
  },
    cusName: { 
      type: String,
      required: true,
    },
    cusAddress: {
      type: String,
      required: true,
    },
    deliDate: {
      type: Date,
      required: true,
    },
    assignDriv: {
      type: String,
      required: true,
    },
    deliStatus: {
        type: String,
        required: true,
    },
    
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema); 

export default Task;