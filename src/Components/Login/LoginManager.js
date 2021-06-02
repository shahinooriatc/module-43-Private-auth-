//Email validator:/(.+)@(.+){2,}\.(.+){2,}/
//StrongRegex Password =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
//Phone number validator:/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/

import firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebase.config';


// Initialize Firebase
export const InitializeLoginFrameworks = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);

    }
}


//Create New User With Email & Password....
export const CreateNewUserWithEmailAndPassword = (displayName, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
            // Signed in 
            const { email, photoURL } = result.user;
            const newUserInfo = { email, photoURL, displayName };
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserInfo(displayName);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

//Update user information....
const updateUserInfo = (displayName) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: displayName
    })
        .then(result => {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
}

//Login user with Email & Password....
export const loginUserWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(result => {
            // Signed in
            const newUserInfo = result.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;

        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}


//Google Sign In... with Provider...
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { displayName, email, photoURL } = result.user;
            // // Create new variable signedInUser to store user information.... 
            const signedInUser = { isSignedIn: true, displayName: displayName, email: email, photoURL: photoURL, success: true };
            //Set again user new information...
            return signedInUser;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorEmail = error.email;
            const errorMessage = error.message;
            console.log(errorCode, errorEmail, errorMessage);
        });
}

//Sign In with Facebook provider...
export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            console.log(result);
            const user = result.user;
            user.success = true;
            return user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            console.log(errorCode, errorMessage, email);
        });

}

//Sign in with GitHub provider...
export const handleGithubSignIn = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();

    return firebase.auth().signInWithPopup(githubProvider)
        .then((result) => {
            const { displayName, email, photoURL } = result.user;
            // // Create new variable signedInUser to store user information.... 
            const signedInUser = { isSignedIn: true, displayName: displayName, email: email, photoURL: photoURL };
            //Set again user new information...
            return signedInUser;
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode, errorMessage, email, credential);
        });
}


// Sign Out from all provider...
export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(() => {
            // Sign-out successful.
            const signOutUser = {
                isSignedIn: false
            }
            return signOutUser;
        })
        .catch(error => {
            console.log('session Out');
        })
}



