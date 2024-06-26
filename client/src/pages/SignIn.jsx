import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth.jsx';

export default function SignIn() {
  const [formData,setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch(error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='p-5 max-w-lg mx-auto border-2 border-yellow-900/50 rounded-2xl my-32 bg-whitesmoke'>
    <h1 className='text-yellow-900/90 text-center text-4xl font-semibold my-10'>SignIn</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type="text" placeholder="username" className='border-yellow-900/50 border p-3 rounded-lg bg-yellow-900/5 text-slate-900/90 hover:brightness-75 focus:outline-none active:outline-yellow-900/50 placeholder:text-slate-400' id='username' onChange={handleChange}/>
      <input type="password" placeholder="password" className='border-yellow-900/50 border p-3 rounded-lg bg-yellow-900/5 text-slate-900/90 hover:brightness-75 focus:outline-none active:outline-yellow-900/50 placeholder:text-slate-400' id='password' onChange={handleChange}/>
      <button disabled={loading} className='bg-yellow-900/90 text-white p-3 rounded-lg uppercase hover:bg-yellow-700 hover:border-yellow-900/70 hover:border-2 disabled:opacity-40 active:bg-yellow-900/90'>
        {loading? 'Loading...' : 'Sign In'}
      </button>
      <OAuth/>
    </form>
    <div className="flex gap-2 mt-4">
      <p className="text-yellow-900/70">Dont have an Account?</p>
      <Link to="/sign-up">
        <span className="text-sky-600 hover:underline hover:text-lg active:text-sky-900">Sign Up</span>
      </Link>
    </div>
    {error && <p className="text-rose-600 mt-4">{error}</p>}
  </div>
  )
}
