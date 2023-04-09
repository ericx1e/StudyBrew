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
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { doc, getDocs } from 'firebase/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
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




function TableRow(props) {
  const item = props.session;
  const initRef = firestore.collection("studysessions").doc(item.id)
  return (
    <tr>
      <td>
        {item.time && item.time.toDate().toDateString()}
      </td>
      <td>
        {item.sessionstudycount && item.sessionstudycount}
      </td>
      <td>
        {item.time && item.time.toDate().toLocaleTimeString('en-US')}
      </td>
      <td>
        {item.endtime && item.endtime.toDate().toLocaleTimeString('en-US')}
      </td>
    </tr>
  )
}


function DisplayStats() {
  const uid = auth.currentUser;
  const userRef = firestore.collection("studysessions");
  const query = userRef.where("uid", "==", auth.currentUser.uid);
  const [sessions] = useCollectionData(query);
  const profileRef = firestore.collection("data").doc("Wvdz5LGfXtSgXFB8BnwqTaZccZF3");
  const userProfile = useDocumentData(profileRef);
  console.log(userProfile);
  return (
    <div className="stat-display">
      {<h3>Total Time Studying:{userProfile[0] &&userProfile[0].studyhours}</h3>}
      <div className="table-container-container">
        <button className="button" onClick={() => {
          query.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              doc.ref.delete();
            });
          })
        }}>Clear</button>
        <div className="table-contain">
          <table className="table">
            <thead>
              <tr>
                <th>
                  Date
                </th>
                <th>
                  Minutes Studied
                </th>
                <th>
                  Start Time
                </th>
                <th>
                  End Time
                </th>
              </tr>
            </thead>
            <tbody>

              {sessions && sessions.sort((a, b) => a.time - b.time).map(item => <TableRow key={item.time} session={item} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
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
      <div className='header'>{user ? <SignOut className="sign-button" /> : <SignIn className="sign-button" />}</div>
      <div className='col-left'>
        <h1 className={user ? "text-signed-in" : "text-signed-out"}>{user ? auth.currentUser.displayName : "Sign In To View Your Studying Stats"}</h1>

        {user ? <DisplayStats /> : <></>}
      </div>
      <div className="col-right"><img className="tea-img" src="/tea_png.png" alt="image" /></div>
    </div>
  )
}


export default User