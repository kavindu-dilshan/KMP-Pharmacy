import { useSelector } from 'react-redux';
import { FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import DriveNavigationBar from '../../components/DriveNavigationBar';
import { Link } from 'react-router-dom';

export default function DriverProfile() {
  
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/driver/updatedri/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/driver/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/'); 
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };
  
  return (
<div className='bg-paleblue'>
  <DriveNavigationBar />
  <div className='p-2 max-w-lg mx-auto'>
  <span onClick={handleSignOut} className='text-white cursor-pointer absolute top-15 right-0 mt-2 mr-4 px-4 py-2 bg-red-700 border border-red-950 rounded-lg flex items-center'>
  <FaSignOutAlt className='mr-2' /> Log Out
  </span>
  <h1 className='text-4xl font-bold text-blue text-center mt-4'>Driver Profile</h1>
    <div class="p-3 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue">
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

      
        <div className="flex flex-row gap-16">
          <label className='font-semibold text-black'>Driver ID : </label>
          <input type='text'placeholder='Driver Id'defaultValue={currentUser.driverId}id='driverId'className='border p-1 rounded-lg ml-2'onChange={handleChange}readOnly/>
        </div>

        <div className="flex flex-row gap-9">
          <label className='font-semibold text-black'>Driver Name : </label>
          <input type='text'placeholder='Driver Name'id='driverName'defaultValue={currentUser.driverName}className='border p-1 rounded-lg ml-2'onChange={handleChange}readOnl/>
        </div>

        <div className="flex flex-row gap-5">
          <label className='font-semibold text-black'>Driver License : </label>
          <input type='text'placeholder='Driver License'id='driverLicense'defaultValue={currentUser.driverLicense} className='border p-1 rounded-lg ml-2'onChange={handleChange}readOnly/>
        </div>

        <div className="flex flex-row gap-1">
          <label className='font-semibold text-black'>Contact Number :  </label>
          <input type='text'placeholder='Phone number'defaultValue={currentUser.contactNo}id='contactNo'className='border p-1 rounded-lg ml-2'onChange={handleChange}readOnly/>
        </div>

        <div className="flex flex-row gap-2">
          <label className='font-semibold text-black'>Vehicle License : </label>
          <input type='text'placeholder='Vehicle License'defaultValue={currentUser.vehicleLicense}id='vehicleLicense'className='border p-1 rounded-lg ml-2'onChange={handleChange}readOnly/>
        </div>
      
        <div className="flex flex-row gap-5">
          <label className='font-semibold text-black'>Vehicle Model : </label>
          <select id="vehicleModel"defaultValue={currentUser.vehicleModel}onChange={handleChange} className='border p-1 rounded-lg ml-2 w-56'required>
            <option value="Bike">Bike</option>
            <option value="Threewheel">Threewheel</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
          </select>
        </div>

        <div className="flex flex-row gap-11">
          <label className='font-semibold text-black'>Availability : </label>
          <select id="availabilty" defaultValue={currentUser.availabilty} onChange={handleChange} className='border p-1 rounded-lg ml-2 w-56'required>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <button
          disabled={loading}
          className='bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>

        <Link
          to="/driver-task"
          className='bg-light-blue border-light-blue text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
        >
          Delivery Tasks
        </Link>
          
      </form>
    </div>
    
    <p className='text-red-700 mt-5 text-center'>{error ? error : ''}</p>
    <p className='text-green-700 mt-5 text-center'>
      {updateSuccess ? 'Driver updated successfully!' : ''}
    </p>
  </div>
  <Footer />
</div>
)}