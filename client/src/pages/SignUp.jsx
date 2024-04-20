import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SignUp() {
  const [formData,setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch(error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='p-5 max-w-lg mx-auto border-2 border-red-700 rounded-2xl my-36'>
      <h1 className='text-red-700 text-center text-4xl font-semibold my-10'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder="username" className='border-red-700 border p-3 rounded-lg bg-black text-white focus:outline-none active:outline-red-700' id='username' onChange={handleChange}/>
        <input type="email" placeholder="email" className='border-red-700 border p-3 rounded-lg bg-black text-white focus:outline-none active:outline-red-700' id='email' onChange={handleChange}/>
        <input type="password" placeholder="password" className='border-red-700 border p-3 rounded-lg bg-black text-white focus:outline-none active:outline-red-700' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90 hover:border-white hover:border-2 disabled:opacity-50 active:bg-red-600'>
          {loading? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className="flex gap-2 mt-4">
        <p className="text-white">Have an Account?</p>
        <Link to="/sign-in">
          <span className="text-blue-400 hover:underline hover:text-lg">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-rose-600 mt-4">{error}</p>};
    </div>
  )
}
