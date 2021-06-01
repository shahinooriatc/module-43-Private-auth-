import './Login.css';
import { useContext, useState } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import {
  InitializeLoginFrameworks,
  handleGoogleSignIn, handleFbSignIn, handleGithubSignIn,
  handleSignOut, CreateNewUserWithEmailAndPassword,
  loginUserWithEmailAndPassword,
} from './LoginManager';



function Login() {
  // Initialize Firebase
  InitializeLoginFrameworks();

  //Create new user checkbox...
  const [newUser, setNewUser] = useState(false);

  //User state default...
  const [user, setUser] = useState({
    isSignedIn: false,
    displayName: '',
    email: '',
    password: '',
    photoURL: '',
    phoneNumber: '',
    success: false,
    error: ''
  })


  //Use Context for LoggedInUser....
  const [LoggedInUser, setLoggedInUser] = useContext(userContext);

  //Redirect to shipment after logged in ....
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };


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

  // User Form Submit...
  const handleFormSubmit = (event) => {

    //Create New User Account Using Email & Password...
    if (newUser && user.email && user.password) {
      CreateNewUserWithEmailAndPassword(user.displayName, user.email, user.password)
        .then(result => {
          setUser(result);          
          setLoggedInUser(result);          
          history.replace(from);
        })
    }

    //Sign in With Email & Password...
    if (!newUser && user.email && user.password) {
      loginUserWithEmailAndPassword(user.email, user.password)
        .then(result => {
          setUser(result);
          var { displayName, email } = result;
          let newUserInfo = { displayName: displayName, email: email }
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
    }
    event.preventDefault();
    event.target.reset();

  }
  //Google Login....
  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(result => {
        setUser(result);
        setLoggedInUser(result);
        console.log(LoggedInUser);
        history.replace(from);
      })
  }

  //Facebook Login....
  const facebookSignIn = () => {
    handleFbSignIn()
      .then(result => {
        setUser(result);
        setLoggedInUser(result);
      })
  }
  //GitHub Login....
  const githubSignIn = () => {
    handleGithubSignIn()
      .then(result => {
        setUser(result);
        setLoggedInUser(result);
        history.replace(from);

      })
  }

  const signOut = () => {
    handleSignOut()
      .then(result => {
        setUser(result);
        setLoggedInUser(result);
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
          user.isSignedIn ? <button className='btn btn-warning' onClick={signOut}> Sign Out</button>
            : <button className='btn btn-danger' onClick={googleSignIn} >Sign In with Google</button>
        }
        <br />
        {/* /Sign in button Facebook provider  */}
        <button className='btn btn-primary' onClick={facebookSignIn}>Sign In with Facebook</button>
        <br />
        <button className='btn btn-info' onClick={githubSignIn}>Sign in with GitHub</button>
        {/* /After Sign In User information display.... */}

      </div>

      {/* <div>
        {user.isSignedIn ?
          <div className="current-user">
            <h5>Current User : {user.displayName}</h5>
            <p>Email : {user.email}</p>
            <h5>Phone : {user.phoneNumber}</h5>
            <img style={{ height: '80px', width: '80px', borderRadius: '25px' }} src={user.photoURL} alt="" />

          </div> : <h3>Please Login First</h3>
        }
      </div> */}

    </div>
  );
}

export default Login;


