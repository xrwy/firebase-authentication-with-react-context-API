import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import UpdateProfile from '../components/UpdateProfile'
import { logout, emailVerification } from '../firebase/firebase'
import { LOG_OUT } from '../action_types/ACTION_TYPES'

const Home = () => {
  
  const { user, dispatch }  = useAuthContext();
  const navigate = useNavigate();

  if(user) {
    return (
      <div className="max-w-2xl mx-auto py-4">
        <h1 className="flex gap-x-4 items-center justify-evenly">
          {
            user.photoURL && <img className="w-7 h-7 rounded-full" src={user.photoURL} alt="avatar"/>
          }
          You are logged in. ({user.email})
          <button onClick={async() => {
            try {
              await logout();
              dispatch({type:LOG_OUT})
              navigate('/', {
                replace:true
              })
            } catch (error) {
              console.log(error.message)
            }
          }} className="h-8 full rounded px-4 text-sm text-white bg-indigo-700">
            Log out
          </button>
          {
            !user.emailVerified &&
            <button onClick={async() => {
              try {
                await emailVerification()
              } catch (error) {
                console.log(error.message)
              }
            }} className="h-8 rounded px-4 text-sm text-white bg-indigo-700">
              Confirm Email
            </button>
          }
        </h1>
        <UpdateProfile />
      </div>
    )
  }
  
  return (
    <div className="py-4 px-4 flex items-center justify-center h-screen">
      <Link to="/register" className="px-3 py-3 inline-block disabled:opacity-20 cursor-pointer inline-flex items-center border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</Link>
      <Link to="/login" className="px-3 py-3 ml-4 inline-block disabled:opacity-20 cursor-pointer inline-flex items-center border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</Link>
    </div>

  )
}

export default Home
