import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthProvider'
import { _updateProfile, resetPassword, _updateEmail } from '../firebase/firebase';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER, LOG_OUT } from '../action_types/ACTION_TYPES';

const UpdateProfile = () => {

  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [displayNameAndSurnameAndAvatar, setDisplayNameSurnameAndAvatar] = useState(
    {displayName:user.displayName || '', photoURL:user.photoURL || ''}
  );
  const [password, setPassword] = useState({password:'', confirmPassword:''})
  const [email, setEmail] = useState(user.email || '');

  const handleDisplayNameandPhotoURLSubmit = async(e) => {
    e.preventDefault();

    try {
      const data = await _updateProfile(displayNameAndSurnameAndAvatar);
      if(data) {
        dispatch({type:LOGIN_USER,
        payload:{
          displayName:auth.currentUser.displayName,
          email:auth.currentUser.email,
          emailVerified:auth.currentUser.emailVerified,
          photoURL:auth.currentUser.photoURL,
          uid:auth.currentUser.uid
        }
      })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const getPassword = (e) => {
    setPassword({...password, [e.target.name]:e.target.value})
  }

  const handleResetSubmit = async(e) => {
    e.preventDefault();

    try {
      const data = await resetPassword(password.password);
      if(data) {
        dispatch({type:LOG_OUT})
        navigate('/login', {
          replace:true
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleEmailAddressSubmit = async(e) => {
    e.preventDefault();

    try {
      const data = await _updateEmail(email);
      if(data) {
        dispatch({type:LOG_OUT})
        navigate('/login', {
          replace:true
        })
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handleDisplayNameandPhotoURLSubmit}>
        <h1 className="text-xl font-bold mb-4">Update Profile</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name - Surname
          </label>
          <div className="mt-1">
            <input
            type="text"
            name="displayName"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="John Doe"
            value={displayNameAndSurnameAndAvatar.displayName}
            onChange={(e) => setDisplayNameSurnameAndAvatar({...displayNameAndSurnameAndAvatar, [e.target.name]:e.target.value})}
            autoComplete="off"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photo
          </label>
          <div className="mt-1">
            <input
            type="text"
            name="photoURL"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="John Doe"
            value={displayNameAndSurnameAndAvatar.photoURL}
            onChange={(e) => setDisplayNameSurnameAndAvatar({...displayNameAndSurnameAndAvatar, [e.target.name]:e.target.value})}
            autoComplete="off"
            />
          </div>
        </div>
        <div>
          <button 
          className='disabled:opacity-20 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
          type='submit'
          disabled={!displayNameAndSurnameAndAvatar.displayName || !displayNameAndSurnameAndAvatar.photoURL}>
            Update Profile
          </button>
        </div>
      </form>

      <hr />
    
      <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handleResetSubmit}>
        <h1 className="text-xl font-bold mb-4">Reset Password</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="mt-1">
            <input
            type="password"
            name="password"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="******"
            value={password.password}
            onChange={(e) => getPassword(e)}
            autoComplete="off"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password Again
          </label>
          <div className="mt-1">
            <input
            type="password"
            name="confirmPassword"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="******"
            value={password.confirmPassword}
            onChange={(e) => getPassword(e)}
            autoComplete="off"
            />
          </div>
        </div>
        <div>
        
        <button 
        className='disabled:opacity-20 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
        type='submit'
        disabled={!(password.password === password.confirmPassword && password.password && password.confirmPassword) ? true : false}>
          Reset Password
        </button>
      </div>
    </form>

    <hr />  

    <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handleEmailAddressSubmit}>
      <h1 className="text-xl font-bold mb-4">E-Mail Update </h1>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          New E-Mail
        </label>
        <div className="mt-1">
          <input
          type="email"
          name="mail"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="YourNewEmail@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          />
        </div>
      </div>
      
      <div>
        <button 
        className='disabled:opacity-20 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
        type='submit'
        disabled={!email ? true : false}>
          Update E-Mail
        </button>
      </div>
    </form>
  </div>
  )
}

export default UpdateProfile
