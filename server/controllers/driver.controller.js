import Driver from "../models/driver.model.js"
import jwt from 'jsonwebtoken'

const createDriver = async (req, res) => {
    try {
        const {driverId, driverName, driverLicense, vehicleModel, availabilty, contactNo, vehicleLicense, licenseValidity, password} = req.body
        const newDriver = new Driver({
            driverId, driverName, driverLicense, vehicleModel, availabilty, contactNo, vehicleLicense, licenseValidity,password
        })
        await newDriver.save()
        res.status(200).json({success:true, message:'Driver added successfully!', newDriver})
} catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const getDriver = async(req, res) => {
    try {
        const driver = await Driver.find()
        if(!driver) {
            return res.status(404).json({success:false, message:'Driver not found!'})
        }
        res.status(200).json({success:true, driver})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }

}

const updateDriver = async(req, res) => {
    try {
        const driverId = req.params.id
        const updateDriver = await Driver.findByIdAndUpdate(driverId, req.body, {new:true})

        if(!updateDriver) {
            return res.status(404).json({success:false, message:'Driver not found!'})
        }
        res.status(200).json({success:true, message:'Driver Updated Successfully!', updateDriver})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const deleteDriver = async (req, res) => {
    try {
        const driverId = req.params.id
        const deleteDriver = await Driver.findByIdAndDelete(driverId)
        
        if(!deleteDriver) {
            return res.status(404).json({success:false, message:'Driver not found!'})
        }
        res.status(200).json({success:true, message:'Driver Deleted Successfully!', deleteDriver})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

const getUpdateDriver = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id)
        if(!driver) {
            return res.status(404).json({success:false, message:'Driver not found!'})
        }
        res.status(200).json({success:true, driver})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

const checkDataExists = async (req, res) => {
  try {
    const { driverId, driverLicense, vehicleLicense,password } = req.query;

    let exists = false;

    if (driverId) {
      const existingDriverId = await Driver.findOne({ driverId });
      if (existingDriverId) {
        exists = true;
      }
    }
    if (driverLicense) {
      const existingDriverLicense = await Driver.findOne({ driverLicense });
      if (existingDriverLicense) {
        exists = true;
      }
    }
    if (vehicleLicense) {
      const existingVehicleLicense = await Driver.findOne({ vehicleLicense });
      if (existingVehicleLicense) {
        exists = true;
      }
    }
    if (password) {
        const existingPassword = await Driver.findOne({ password });
        if (existingPassword) {
          exists = true;
        }
      }

    res.json({ exists });
  } catch (error) {
    console.error('Error in checkDataExists:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const signIn = async (req, res) => {
    try {
        const { driverId, password } = req.body;
        const driver = await Driver.findOne({ driverId });

        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver not found!' });
        }

        if (driver.password !== password) {
            return res.status(401).json({ success: false, message: 'Incorrect password!' });
        }
        const token = jwt.sign({ id:driver._id}, process.env.JWT_SECRET);
        res.cookie('access_token', token, { httpOnly:true }).status(200).json(driver)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export { createDriver, getDriver, updateDriver, deleteDriver, getUpdateDriver,checkDataExists, signIn }