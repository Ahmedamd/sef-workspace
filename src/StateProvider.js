import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);



// import React , {createContext, useContext , useReducer} from "react";


// export const StateContext = createContext();

// export const StateProvider = ({reducer, initialState, children})=>(
//     <StateProvider.provider value = {useReducer(reducer,initialState)}>
//         {children}
//     </StateProvider.provider> 
// );

// export const useStateValue = () => useContext(StateContext);
// // it helps us access value from the Data layer.

// // Now we need to create Reducer
