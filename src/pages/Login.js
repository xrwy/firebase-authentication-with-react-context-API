import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { login, auth } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthContext } from '../context/AuthProvider';
import { LOGIN_USER } from '../action_types/ACTION_TYPES'

let initialValues = {email:'', password:''};

const Login = () => {
  
  const [emailAndPassword, setEmailAndPassword] = useState(initialValues);
  const navigate =  useNavigate();
  const { dispatch } = useAuthContext();

  const getEmailAndPassword = (e) => {
    setEmailAndPassword({...emailAndPassword, [e.target.name]:e.target.value})
  }

  
  const submitEmailAndPassword = async (e) => {
    e.preventDefault();

    try {
      const data = await login(emailAndPassword);

      if(data) {
        onAuthStateChanged(auth, (user) => {
          if(user) {
            dispatch({type:LOGIN_USER, 
            payload:{
              displayName:user.displayName,
              email:user.email,
              emailVerified:user.emailVerified,
              photoURL:user.photoURL,
              uid:user.uid
            }
            })
            navigate('/', {
              replace:true
            })
          }
        })
      }
      
    }catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className="grid h-screen place-items-center">
      <form className="max-w-xl mx-auto grid gap-y-4 py-4 px-4 w-full" onSubmit={submitEmailAndPassword}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            E-Mail
          </label>
          <div className="mt-1">
            <input
            type="email"
            name="email"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Your@example.com"
            value={emailAndPassword.email}
            onChange={(e) => getEmailAndPassword(e)}
            autoComplete="off"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
            type="password"
            name="password"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="******"
            value={emailAndPassword.password}
            onChange={(e) => getEmailAndPassword(e)}
            />
          </div>
        </div>

        <button disabled={!emailAndPassword.email || !emailAndPassword.password} 
        className='disabled:opacity-20 cursor-pointer inline-block items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
        type='submit'>
          Sign up
        </button>
        <div className="py-2 flex justify-evenly items-center border">
          Don't have an account ? <Link to="/register" className='disabled:opacity-20 cursor-pointer inline-block items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Sign Up</Link>
        </div>
      </form>
    </div>
  )

}

export default Login
