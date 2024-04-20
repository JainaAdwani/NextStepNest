import { Link } from "react-router-dom"

export default function SignIn() {
  return (
    <div className='p-5 max-w-lg mx-auto border-2 border-red-700 rounded-2xl my-36'>
      <h1 className='text-red-700 text-center text-4xl font-semibold my-8'>Sign In</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder="username" className='border-red-700 border p-3 rounded-lg bg-black text-white focus:outline-none active:outline-red-700' id='username'/>
        <input type="password" placeholder="password" className='border-red-700 border p-3 rounded-lg bg-black text-white focus:outline-none active:outline-red-700' id='password'/>
        <button className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90 hover:border-white hover:border-2 disabled:opacity-50 active:bg-red-600'>Sign In</button>
        <button className='bg-white text-red-600 p-3 rounded-lg uppercase hover:opacity-90  hover:border-red-700 hover:border-2 disabled:opacity-50 active:bg-slate-300'>Continue with Google</button>
      </form>
      <div className="flex gap-2 mt-4">
        <p className="text-white">Don't have an Account?</p>
        <Link to="/sign-up">
          <span className="text-blue-400 hover:underline hover:text-lg">Sign Up</span>
        </Link>
      </div>
    </div>
  )
}
