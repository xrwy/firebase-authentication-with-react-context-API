import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, /*onAuthStateChanged*/ signInWithEmailAndPassword, updateProfile, updatePassword, updateEmail,sendEmailVerification, signOut} from 'firebase/auth'
import toast from "react-hot-toast";

const firebaseConfig = {
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_ID
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth();


export const register = async (emailAndPassword) => {
    try {
        await createUserWithEmailAndPassword(auth, emailAndPassword.email, emailAndPassword.password)
        return true

    }catch (error) {
        toast.error(error.message);
    }
}

export const login = async (emailAndPassword) => {
    try {
        await signInWithEmailAndPassword(auth, emailAndPassword.email, emailAndPassword.password)
        return true;

    }catch (error) {
        toast.error(error.message);
    }
}


export const _updateProfile = async (newProfile) => {
    try {
        await updateProfile(auth.currentUser, newProfile)
        toast.success('Profile Updated Successfully.')
        return true;

    } catch (error) {
        toast.error(error.message)
    }
}

export const resetPassword = async (newPassword) => {
    try {
        await updatePassword(auth.currentUser,newPassword)
        toast.success('Password Changed Successfully.')
        return true;

    } catch (error) {
        toast.error(error.message)
    }
}

export const _updateEmail = async (newEmail) => {
    try {
        await updateEmail(auth.currentUser, newEmail)
        toast.success('Email Updated Successfully.')
        return true;

    } catch (error) {
        toast.error(error.message)
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
        toast.success('Signed Out Successfully.')
        return true;
        
    }catch (error) {
        toast.error(error.message);
    }

}

export const emailVerification = async () => {
    try {
        await sendEmailVerification(auth.currentUser)
        toast.success(`Verification Mail has been sent to ${auth.currentUser.email}. Please check.`)
        return true;
        
    }catch (error) {
        toast.error(error.message);
    }
}

export default app;


/*
onAuthStateChanged(auth, (user) => {
    if(user) {
        //console.log(user)
    }else {
        console.log("Error")
    }
})
*/
