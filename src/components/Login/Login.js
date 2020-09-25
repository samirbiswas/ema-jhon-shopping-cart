import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { Mycontext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';

firebase.initializeApp(firebaseConfig);


function Login() {
  const [newUser, setNewUser] =useState(false);
  const [user, setUser] = useState({
    isSign :false,
    name :'',
    email :'',
    password :'',
    photo:'',
    error:'',
    success: ''

  })

  const [loggedInUser, setLoggedInUser] = useContext(Mycontext);
  const location = useLocation();
  const history = useHistory();
  let { from } = location.state || { from: { pathname: "/" } };


//   var provider = new firebase.auth.GoogleAuthProvider();

//   const handleSignIn=()=>{
//     firebase.auth().signInWithPopup(provider)
//     .then(res=>{
//       const {displayName,email,photoURL} = res.user;
//       const signInUser = {
//         isSign : true,
//         name : displayName,
//         email: email,
//         photo: photoURL
//       }
//       setUser(signInUser);
      
//     })
//     .catch(err=>{
//       console.log(err);
//       console.log(err.message);
     
//     })
//   }

//   const handleSignOut = ()=>{
//     firebase.auth().signOut()
//     .then(res=>{
//      const logOutUser = {
//       isSign : false,
//       name :'',
//       email :'',
//       photo :''

//      }
//      setUser(logOutUser);
//     })
//   }
  const andelarChange =(e)=>{
    console.log(e.target.name, e.target.value);
    let fromValid = true;
    if(e.target.name === 'email'){

      fromValid = /\S+@\S+\.\S+/.test(e.target.value);
    
    }
    if(e.target.name === 'password'){

      const isValidPassword1 = e.target.value.length > 6;
      const isValidPassword2 = /\d{1}/.test(e.target.value);
      fromValid = isValidPassword1 && isValidPassword2
    }
    if(fromValid){
      const newUserInfo ={...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

  }

  const handleSubmit =(e)=>{

      if(newUser && user.email && user.password){

        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res=>{
          const newUserInfo = {...user};
          newUserInfo.error ='';
          newUserInfo.success =true;
          setUser(newUserInfo);
          updateName(user.name);

        })

        .catch(error=>{
          const newUserInfo = {...user};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        })


      }
      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res=>{
          const newUserInfo = {...user};
          newUserInfo.error ='';
          newUserInfo.success =true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
         // console.log('sign in user info', res.user);

        })
        .catch(error=> {
          const newUserInfo = {...user};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);

        })
      }
      e.preventDefault();

      }
const updateName = (name)=>{
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name,
   
  }).then(function() {
    console.log('user crearted successfully')
  }).catch(function(error) {
    console.log(error);
  });


}
  return (

    <div className="login-area">
      {/* {
        user.isSign ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign IN</button>
            
      }
      {
        user.isSign && <div>
                  <p>Hello ,{user.name}</p>
                  <p>{user.email}</p>
                  
                  </div> 
      } */}
      
      <h1>Login Info</h1>
       <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">Sign Up Here </label>
      <form onSubmit={handleSubmit}>
      
      { newUser &&< input type="text" name="name" onBlur={andelarChange} placeholder="Your Name" />}
      <br/>
      <input type="text" name="email" onBlur={andelarChange} placeholder="Your Email" required/>
      <br/>
      <input type="password" name="password" onBlur={andelarChange} placeholder="Your Password" required/>
      <br/>
      <input type="submit" value="submit"/>
      <p>{user.error}</p>
      {user.success && <p style={{color:'green'}}> User {newUser ? 'created' :'Logged IN'}  successfully</p> }

      </form>
      
    </div>
  );
}

export default Login;
