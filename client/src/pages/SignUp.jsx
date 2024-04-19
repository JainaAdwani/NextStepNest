import { Link } from "react-router-dom"

export default function SignOut() {
  return (
    <div className='p-5 max-w-lg mx-auto border-2 border-red-700 rounded-2xl my-36'>
      <h1 className='text-red-700 text-center text-4xl font-semibold my-10'>SignUp</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder="username" className='border-red-700 border p-3 rounded-lg bg-black' id='username'/>
        <input type="email" placeholder="email" className='border-red-700 border p-3 rounded-lg bg-black' id='email'/>
        <input type="password" placeholder="password" className='border-red-700 border p-3 rounded-lg bg-black' id='password'/>
        <button className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90 hover:border-white hover:border-2 disabled:opacity-50'>Sign Up</button>
        <button className='bg-white text-red-600 p-3 rounded-lg uppercase hover:opacity-90  hover:border-red-700 hover:border-2 disabled:opacity-50'>Continue with Google</button>
      </form>
      <div className="flex gap-2 mt-4">
        <p className="text-white">Have an Account?</p>
        <Link to="/sign-in">
          <span className="text-blue-400 hover:underline hover:text-lg">Sign In</span>
        </Link>
      </div>
    </div>
  )
}
