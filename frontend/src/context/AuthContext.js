import { createContext, useEffect, useReducer } from 'react';

const initial_state = {
  user: (() => {
    try {
      return localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  })(),
  loading: false,
  error: null
};
function debounce(func, wait) {
   let timeout;
   return function (...args) {
     const context = this;
     clearTimeout(timeout);
     timeout = setTimeout(() => func.apply(context, args), wait);
   };
 }
export const AuthContext = createContext(initial_state);

// Define your action types as constants or enums to prevent typos
const ActionTypes = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  LOGOUT: 'LOGOUT'
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_START:
      return {
        user: null,
        loading: true,
        error: null
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        error: null
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        user: null,
        loading: false,
        error: action.payload
      };
    case ActionTypes.REGISTER_SUCCESS:
      return {
        user: null,
        loading: false,
        error: null
      };
    case ActionTypes.LOGOUT:
      return {
        user: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AuthReducer, initial_state);
 
   useEffect(() => {
     let timeoutId;
 
     const saveUserToLocalStorage = () => {
       localStorage.setItem("user", JSON.stringify(state.user));
     };
 
     // Clear any existing timeout and set a new one
     clearTimeout(timeoutId);
     timeoutId = setTimeout(saveUserToLocalStorage, 1000); // Example: Save after a 1-second delay
 
     // Clean up the timeout when the component unmounts
     return () => clearTimeout(timeoutId);
   }, [state.user]);
 
   return <AuthContext.Provider value={{
     user: state.user,
     loading: state.loading,
     error: state.error,
     dispatch,
   }}>
     {children}
   </AuthContext.Provider>;
 };
 
