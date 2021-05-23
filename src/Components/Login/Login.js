import './Login.css';
import firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function Login() {

  //Create new user checkbox...
  const [newUser, setNewUser] = useState(false);

  //User state default...
  const [user, setUser] = useState({
    isSignedIn: false,
    displayName: '',
    email: '',
    password: '',
    phoneNumber: '',
    gb: '',
    success: false,
    error: ''
  })

  //User Input Form Validation using Regex... 
  const handleBlur = (event) => {
    let isFormValid = true;
    if (event.target.name === 'email') {
      isFormValid = /(.+)@(.+){2,}\.(.+){2,}/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      isFormValid = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{5,})/.test(event.target.value);
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }

  }
  //Email validator:/(.+)@(.+){2,}\.(.+){2,}/
  //StrongRegex Password =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  //Phone number validator:/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/


  // User Form Submit...
  const handleFormSubmit = (event) => {

    //Create New User Account Using Email & Password...
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(result => {
          // Signed in 
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserInfo(user.displayName, user.age);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    //Sign in With Email & Password...

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(result => {
          console.log('Logged in successfully');
          console.log(result);
          const user = result.user;
          console.log(user);
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });

    }
    event.preventDefault();
    event.target.reset();

  }
  //Update user information....
  const updateUserInfo = (displayName, age) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: displayName,
      photoURL: age
    })
      .then(result => {
        console.log('from updata result', result);
        // Update successful.
      }).catch(function (error) {
        // An error happened.
      });
  }


  //Google Sign In... with Provider...
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then(result => {
        // const { displayName, email, photoURL } = result.user;
        // // Create new variable signedInUser to store user information.... 
        // const signedInUser = { isSignedIn: true, name: displayName, email: email, photo: photoURL };
        //Set again user new information...
        // setUser(signedInUser);
        setUser(result.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorEmail = error.email;
        const errorMessage = error.message;
        setUser(errorMessage);
        console.log(errorCode, errorEmail, errorMessage);
      });
  }

  //Sign In with Facebook provider...
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        setUser(user)
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });

  }

  //Sign in with GitHub provider...
  const githubProvider = new firebase.auth.GithubAuthProvider();
  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  //Sign in with Tweeter Provider.....




  // Sign Out from all provider...
  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        // Sign-out successful.
        const signOutUser = {
          isSignedIn: false
        }
        setUser(signOutUser);
      })
      .catch(error => {
        console.log('session Out');
      })
  }

  return (
    <div className="App container">
      <div className="signIn-form">
        <h2>User Sign Up form</h2>
        <input type="checkbox" name="NewUser" onChange={() => setNewUser(!newUser)} /><label htmlFor="NewUser">Create New User</label>

        <form onSubmit={handleFormSubmit}>
          {newUser && <input type="text" name='displayName' onBlur={handleBlur} placeholder='Name' />}<br />
          <input type="email" name="email" onBlur={handleBlur} placeholder='Email' required /><br />
          <input type="password" name='password' onBlur={handleBlur} placeholder='Password ex: Jhon#3' required /><br />
          {newUser && <input type="password" onBlur={handleBlur} placeholder='Confirm Password' required />} <br />
          {newUser && <input type="number" name='age' onBlur={handleBlur} placeholder='Age' />} <br />
          {newUser && <input type="contact" name='phoneNumber' onBlur={handleBlur} placeholder='Phone Number' />} <br />
          {newUser ? <input type="submit" value="Sign Up" /> : <input type="submit" value="Sign In" />}


        </form>
      </div>


      {/* Error Message */}
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p className='text-primary'>User {newUser ? 'Created' : 'LoggedIn'} Successfully</p>}


      <hr />
      <div className="signIn-button">
        {/* /Sign in button google provider  */}
        {
          user.isSignedIn ? <button className='btn btn-warning' onClick={handleSignOut}> Sign Out</button>
            : <button className='btn btn-danger' onClick={handleGoogleSignIn} >Sign In with Google</button>
        }
        <br />
        {/* /Sign in button Facebook provider  */}
        <button className='btn btn-primary' onClick={handleFbSignIn}>Sign In with Facebook</button>
        <br />
        <button className='btn btn-info' onClick={handleGithubSignIn}>Sign in with GitHub</button>
        {/* /After Sign In User information display.... */}

      </div>
      {user.isSignedIn &&
        <div className="user-profile">
          <h4>Name : {user.displayName}</h4>
          <h5>Email : {user.email}</h5>
          <h5>Phone : {user.phoneNumber}</h5>
          <img src={user.photoURL} alt="" />
        </div>
      }
    </div>
  );
}

export default Login;


