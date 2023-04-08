import { useState } from 'react'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import "bulma/css/bulma.css"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/functions'
import "./User.css"

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp ({
  apiKey: "AIzaSyBsUxBOw63CIa683DKZop2JnWh1fO6E0y8",
  authDomain: "studybrew-638f3.firebaseapp.com",
  projectId: "studybrew-638f3",
  storageBucket: "studybrew-638f3.appspot.com",
  messagingSenderId: "624980619209",
  appId: "1:624980619209:web:36bc2e08fd7011cc7c4218",
  measurementId: "G-NKR5F743C6"
});

// Initialize Firebase
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
const functions = firebase.functions();


function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="button is-primary" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <>
      <button className="button" onClick={() => auth.signOut()}>Sign Out</button>
    </>
  )
}

function User() {

    const [user] = useAuthState(auth);

      

    return (
        <div className="user-page">
            {/* <img className="tea-img" src="/tea_png.png" alt="image" /> */}
            {user ? <SignOut className = "sign-button"/> : <SignIn className="sign-button"/>}
        </div>
    )
}
  

export default User