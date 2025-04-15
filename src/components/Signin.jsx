import React from 'react'
import { Button } from '@mui/material';
import social from "../images/social.png"
import {signInWithPopup} from "firebase/auth"
import { auth, database, GoogleProvider } from '../firebase/setup';
import { useNavigate } from 'react-router-dom';
import { doc,setDoc } from 'firebase/firestore';

// Your Firebase configuration and setup...



function Signin() {
    const navigate = useNavigate()


    const addUser = async()=>{
        const userDoc = doc(database,"Users",`${auth.currentUser?.email}`)
        try{
            await setDoc(userDoc,{
                username: auth.currentUser?.displayName,
                email: auth.currentUser?.email,
                id :auth.currentUser?.uid
            })
        }catch(err){
            console.error(err)
        }
    }

    const googleSignin = async() =>{
        try{
            await signInWithPopup(auth,GoogleProvider)
            addUser()
            navigate("/main")

        }catch(err){
            console.log(err)
        }

    }
    console.log(auth)
    
  return (
    
    <div style={{position:"absolute",top:"5%",left:"28%",padding:"150px"}}>
        <div style={{border:"1px solid grey",padding:"20px",textAlign:"center",borderRadius:"5px",minHeight:"310px",maxWidth:"350px"}}>
        <img style={{width:"70px",textAlign:"center"}} src={social}/>
        <h2 style={{fontweight:"200"}}>Create  your google clone account</h2>
        <h3 style={{fontweight:"200"}}>click the signin button</h3>
        <button onClick={ googleSignin} variant="contained">Signin with google</button>
        </div>
    </div>
  )
}

export default Signin;


