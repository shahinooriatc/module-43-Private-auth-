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
// export const CreateNewUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//         .then(result => {
//             // Signed in 
//             const newUserInfo = { ...user };
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//             updateUserInfo(user.displayName, user.phoneNumber);
//             console.log(result.user);
//             console.log('user state', user);
//         })
//         .catch((error) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo);
//         });
// }

//Login user with Email & Password....
// export const loginUserWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//         .then(result => {
//             console.log(result.user);
//             // Signed in
//             const newUserInfo = { ...result.user };
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//             setLoggedInUser(newUserInfo);
//             history.replace(from);

//             console.log('after logged in', newUserInfo);
//         })
//         .catch((error) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo);
//         });
// }


//Google Sign In... with Provider...
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { displayName, email, photoURL } = result.user;
            // // Create new variable signedInUser to store user information.... 
            const signedInUser = { isSignedIn: true, displayName: displayName, email: email, photoURL: photoURL };
            //Set again user new information...
            return signedInUser;
            // setUser(result.user);
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
export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            const user = result.user;
            return user;
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
export const handleGithubSignIn = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();

    return firebase.auth().signInWithPopup(githubProvider)
        .then((result) => {
            console.log(result);
            const user = result.user;
            return user;
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


//Update user information....
const updateUserInfo = (displayName, phoneNumber) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: displayName,
        phoneNumber: phoneNumber
    })
        .then(result => {
            console.log(result);
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
}
