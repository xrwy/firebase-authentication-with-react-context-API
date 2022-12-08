import { createContext, useContext, useState } from "react"
import { LOGIN_USER, LOG_OUT } from "../action_types/ACTION_TYPES";
const AuthContext = createContext();


const loginReducer = (state, payload) => {
    localStorage.setItem('user', JSON.stringify(payload))

    return {
        ...state,
        user:JSON.parse(localStorage.getItem('user'))  || false
    }
}

const logoutReducer = (state, payload) => {
    localStorage.removeItem('user');

    return {
        ...state,
        user:payload,
    }
}


export const AuthProvider = ({ children }) => {

    const [state, setState] = useState({
        user:JSON.parse(localStorage.getItem('user')) || false,
        dispatch:action => {
            switch(action.type) {
                case LOGIN_USER:
                    setState((state) => loginReducer(state, action.payload))
                    break;
                case LOG_OUT:
                    setState((state) => logoutReducer(state, false))
                    break;
                default:
                    break;
            }
        }
    });

    return (
        <AuthContext.Provider value={state}>
            { children } 
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);

