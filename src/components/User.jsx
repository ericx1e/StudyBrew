import { useState } from 'react'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import "bulma/css/bulma.css"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/functions'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc } from "firebase/firestore";

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


function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="button" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}
function DisplayStats() {
  const userRef = firestore.collection("studysessions");
  const [sessions] = userRef.where("uid", "==", auth.currentUser.uid);
  const userProfile = firestore.collection("data").where("uid", "==", auth.currentUser.uid);
  
}
function SaveTime(hours) {
  const studysession = firestore.collection("studysessions");
  const uid = auth.currentUser;

  studysession.add({
    sesssionstudycount: hours,
    time: firebase.firestore.FieldValue.serverTimeStamp(),
    uid,
  })


}
function SignOut() {
  return auth.currentUser && (
    <button className="button" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function User() {

    const [user] = useAuthState(auth);

    return (
        <>
            {user ? <SignOut /> : <SignIn />}
        </>
    )
}
  

export default User