import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {
    driverId: {
      type:String,
      required: true,
      unique: true,
  },
    driverName: { 
      type: String,
      required: true,
    },
    driverLicense: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    availabilty: {
      type: String,
      required: true,
    },
    contactNo: {
        type:Number,
        required: true,
    },
    vehicleLicense: {
        type:String,
        required: true,
        unique: true,
    },
    licenseValidity: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
        unique:true,
    },
    
  },
  { timestamps: true }
);

const Driver = mongoose.model('Driver', driverSchema);  //Create model

export default Driver;