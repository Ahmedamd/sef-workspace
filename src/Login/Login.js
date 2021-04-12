import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import {auth,provider}  from "../firebase";
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../Reducer';


function Login() {

    const [state, dispatch] = useStateValue();

    const signIn = () =>{
        auth.signInWithPopup(provider).then((result)=>{
            console.log("result is",result);
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        }).catch((error)=>{
            alert(error.message);
        });
    };

    
    return (
        <div className = "Login">
            <div className="login__Container">
                <img src= "/coverPages/SEFLOGO.png" alt=""/>
                <h1>Sign In to Somali Education Fund's Workspace</h1>
                <p>somalieducationfund.com</p>

            <Button onClick ={signIn}>Sign In with Google</Button>
            </div>
         
           
        </div>
    )
}

export default Login
