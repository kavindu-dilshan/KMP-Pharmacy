import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SideBar from '../../components/SideBar';
import { getStorage, uploadBytesResumable,ref,getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';


export default function Prescriptionform() {
    const navigate = useNavigate();
    const [imageUploadError, setImageUploadError] = useState('false');
    const [files,setFiles] = useState();
    const [error, setError] = useState('');
    const [uploading,setuploading] = useState(false);
    const [value, setValue] = useState({
        prescriptionID: '',
        firstname: '',
        lastname: '',
        age: '',
        contactNo: '',
        image: '',
        notes: ''
    });

    console.log(value.image);

    const handleImageSubmit = async (e) => {
        if (files.length > 0) {
            try {
                setuploading(true);
                const image = await storeImage(files[0]);
                setValue({
                    ...value,
                    image: image // Corrected key: imageUrl instead of imageUrls  //Can use any name // like a variable // use as a key
                });
                setuploading(false);
                setImageUploadError(false);
            } catch (error) {
                setImageUploadError('Image upload failed (2mb max per image)');
                setuploading(false);
            }
        }
    };
    
    
    

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;

        setValue(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };  
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addPrescription = await axios.post('http://localhost:3000/api/prescription/create', value);
            const response = addPrescription.data;
            if (response.success) {
                toast.success(response.message, { duration: 2000 });
                setTimeout(() => {
                    navigate('/prescription-management');
                }, 1000);
            }           
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        console.log(value);
    };

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1'>
                <div className='bg-paleblue justify-between flex px-10 py-8'>
                    <h1 className='text-4xl font-bold text-blue'>Prescription Form</h1>
                </div>
                <div className="p-10 bg-paleblue m-10 rounded-3xl max-w-7xl border-2 border-light-blue shadow-lg">
                        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-40'>
                            <div className='flex flex-col gap-1 flex-1'>
                                <label className='font-semibold text-black'>Prescription ID</label>
                                <input type="text"  placeholder='Enter Prescription ID' id="PrescriptionID" name="PrescriptionID" value={value.PrescriptionID} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 shadow-sm' required/>

                                <label className='font-semibold text-black'>First Name</label>
                                <input type="text" placeholder='Enter First Name' id="firstName" name="firstName" value={value.firstName} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 shadow-sm' required/>
                                {error && <span className="text-red-500">{error}</span>}

                                <label className='font-semibold text-black'>Last Name</label>
                                <input type="text" placeholder='Enter Last Name' id="lastName" name="lastName" value={value.lastName} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 shadow-sm' required/>
                                {error && <span className="text-red-500">{error}</span>}

                                <label className='font-semibold text-black'>Age</label>
                                <input type="text" placeholder='Enter Age' id="age" name="age" value={value.age} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 shadow-sm' required/>

                                <label className='font-semibold text-black'>Contact Number</label>
                                <input type="text" placeholder='Enter Contact Number' id="contactNo" name="contactNo" value={value.contactNo} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 max-h-20 min-h-10 shadow-sm'  required/>
 
                                <label className='font-semibold text-black'>Notes</label>
                                <textarea type="textarea" placeholder='Enter notes' id="notes" name="notes" value={value.notes} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 '/>
                                
                            </div>


                            <div className='flex flex-col gap-1 flex-1'>

                                <label className='font-semibold text-black' htmlFor='Enter image'>Upload image:</label>

                                <div className='flex flex-row flex-0 items-center gap-10'>
                                    <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-3/4' type='file' id='image' accept='image' />
                                    <button onClick = {handleImageSubmit} type='button' disabled={uploading}className='border w-1/3 border-green-700 bg-light-blue text-white rounded uppercase hover:shadow-lg disabled:opacity-80 h-12'>
                                        {uploading ? 'Uploading...' : 'Upload'}
                                    </button>           
                                </div>
                                {<p className='text-red-700'>{imageUploadError && imageUploadError}</p> }

                                <div className=' p-2 flex items-center gap-2'>
                                        <label className='font-semibold text-black'>Available</label>
                                        <input type="checkbox" name="status" id="active" checked={value.status === 'Active'} disabled hidden className='w-5 shadow-sm'/>
                                    </div>

                                <div className='flex flex-row flex-0 items-center gap-10'></div>
                                <input 
                                    type="submit" 
                                    value="Submit" 
                                    className='bg-light-blue hover:bg-blue text-white font-semibold py-2 px-4 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'
                                    style={{
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                        border: 'none'
                                    }}
                                />
                            </div>
                        </form>             
                </div>            
            </div>          
        </div>
    );
}





















