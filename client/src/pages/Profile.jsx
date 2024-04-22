import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on( 'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className='p-5 max-w-lg mx-auto border-2 border-red-700 rounded-2xl my-36'>
      <h1 className='text-red-700 text-center text-4xl font-semibold my-10'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (Image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-white'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type="text" placeholder="username" defaultValue={currentUser.username} className='border-red-700 border p-3 rounded-lg bg-black text-white focus:outline-none active:outline-red-700' id='username' onChange={handleChange}/>
        <input type="text" placeholder="username" defaultValue={currentUser.email} className='border-red-700 border p-3 rounded-lg bg-black text-white focus:outline-none active:outline-red-700' id='email' onChange={handleChange}/>
        <input type="password" placeholder="password" className='border-red-700 border p-3 rounded-lg bg-black text-white focus:outline-none active:outline-red-700' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90 hover:border-white hover:border-2 disabled:opacity-50 active:bg-red-600'>
          {loading? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDeleteUser} className="text-blue-400 hover:underline hover:text-lg active:text-blue-500 cursor-pointer">
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-blue-400 hover:underline hover:text-lg active:text-blue-500 cursor-pointer">
          Sign out
        </span>
      </div>
    </div>
  )
}
