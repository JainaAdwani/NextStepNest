import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';
import OAuth from "../components/OAuth.jsx";

export default function SignUp() {
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
  {/*const handleRadioChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      });
  };*/}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
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
      navigate('/sign-in');
    } catch(error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='p-5 max-w-lg mx-auto border-2 border-rose-700 rounded-2xl my-36'>
      <h1 className='text-rose-700 text-center text-4xl font-semibold my-10'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder="username" className='border-rose-700 border p-3 rounded-lg bg-black text-white focus:outline-none active:outline-rose-700' id='username' onChange={handleChange}/>
        <input type="email" placeholder="email" className='border-rose-700 border p-3 rounded-lg bg-black text-white focus:outline-none active:outline-rose-700' id='email' onChange={handleChange}/>
        <input type="password" placeholder="password" className='border-rose-700 border p-3 rounded-lg bg-black text-white focus:outline-none active:outline-rose-700' id='password' onChange={handleChange}/>
        {/*<div>
          <input type="radio" id="Buyer" onChange={handleRadioChange}/>
  </div>*/}
        <button disabled={loading} className='bg-rose-700 text-white p-3 rounded-lg uppercase hover:opacity-90 hover:border-white hover:border-2 disabled:opacity-50 active:bg-rose-600'>
          {loading? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-4">
        <p className="text-white">Have an Account?</p>
        <Link to="/sign-in">
          <span className="text-blue-400 hover:underline hover:text-lg active:text-blue-500">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-rose-600 mt-4">{error}</p>};
    </div>
  )
}
