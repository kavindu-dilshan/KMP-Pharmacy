import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';


export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          phonenumber: req.body.phonenumber,
          address: req.body.address,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

//-----------------------------------------------
export const deleteAllUsers = async (req, res) => {
  try {
      
      const deleteUsers = await User.findByIdAndDelete(req.params.id)
      
      if(!deleteUsers) {
          return res.status(404).json({success:false, message:'User not found!'})
      }
      res.status(200).json({success:true, message:'User Deleted Successfully!', deleteUsers})
  } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, message:'Internal server error'})
  }
}

export const getUsers = async(req, res) => {
  try {
      const user = await User.find()
      if(!user) {
          return res.status(404).json({success:false, message:'user not found!'})
      }
      res.status(200).json({success:true, user})
  } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, message:'Internal Server Error'})
  }
}



