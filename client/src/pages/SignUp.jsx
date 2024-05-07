import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';
import OAuth from "../components/OAuth.jsx";

export default function SignUp() {
  const [formData,setFormData] = useState({});
  const [selectedValue, setSelectedValue] = useState();
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
  
  // const handleRadioChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     type: e,
  //   }); 
  // };

  const handleRadioChange = (value) => { // Uncommented handleRadioChange
    setSelectedValue(value); // Set the selected value
    setFormData({
      ...formData,
      userType: value, // Update formData with selected type
    });
  };

  const formDataWithUserType = {
    ...formData,
    userType: selectedValue // Use the selectedValue as userType
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithUserType),
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
    <div className='p-5 max-w-lg mx-auto border-2 border-yellow-900/50 rounded-2xl my-32 bg-whitesmoke'>
      <h1 className='text-yellow-900/90 text-center text-4xl font-semibold my-10'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder="username" className='border-yellow-900/50 border p-3 rounded-lg bg-yellow-900/5 text-slate-900/90 hover:brightness-75 focus:outline-none active:outline-yellow-900/50 placeholder:text-slate-400' id='username' onChange={handleChange}/>
        <input type="email" placeholder="email" className='border-yellow-900/50 border p-3 rounded-lg bg-yellow-900/5 text-slate-900/90 hover:brightness-75 focus:outline-none active:outline-yellow-900/50 placeholder:text-slate-400' id='email' onChange={handleChange}/>
        <input type="password" placeholder="password" className='border-yellow-900/50 border p-3 rounded-lg bg-yellow-900/5 text-slate-900/90 hover:brightness-75 focus:outline-none active:outline-yellow-900/50 placeholder:text-slate-400' id='password' onChange={handleChange}/>
        {/* <div className="flex flex-row justify-between mx-auto gap-14">
          <div className="flex gap-1.5">
            <input type="radio" id="Buyer" className="mt-1.5" checked={selectedValue === "Buyer/Seller"}  onChange={ () =>  handleRadioChange(Buyer/Seller)}/>
            <span>Buyer / Seller</span>
          </div>
          <div className="flex gap-1.5">
            <input type="radio" id="Agent" className="mt-1.5" checked={selectedValue === "Agent"} onChange={ () =>  handleRadioChange(Agent)}/>
            <span>Agent</span>
          </div>
        </div> */}


<div className="flex justify-center">
        <div className="flex flex-row gap-4 text-center">
          <div
            className={`${
              selectedValue === "Buyer/Seller"
                ? "bg-yellow-900/40 text-white border-yellow-900/40"
                : "bg-white text-yellow-900/75 border-yellow-900/40"
            } border-2 rounded-lg py-3 px-4 m-2 flex items-center justify-center w-36 cursor-pointer transition duration-300 ease-in-out`}
            onClick={() => setSelectedValue("Buyer/Seller")}
          >
            Buyer / Seller
          </div>
          <div
            className={`${
              selectedValue === "Agent"
                ? "bg-yellow-900/40 text-white border-yellow-900/40"
                : "bg-white text-yellow-900/75 border-yellow-900/40"
            } border-2 rounded-lg py-3 px-4 m-2 flex items-center justify-center w-36 cursor-pointer transition duration-300 ease-in-out`}
            onClick={() => setSelectedValue("Agent")}
          >
            Agent
          </div>
        </div>
      </div>




        <button disabled={loading} className='bg-yellow-900/90 text-white p-3 rounded-lg uppercase hover:bg-yellow-700 hover:border-yellow-900/70 hover:border-2 disabled:opacity-40 active:bg-yellow-900/90'>
          {loading? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-4">
        <p className="text-yellow-900/70">Have an Account?</p>
        <Link to="/sign-in">
          <span className="text-sky-600 hover:underline hover:text-lg active:text-sky-900">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-rose-600 mt-4">{error}</p>}
    </div>
  )
}
