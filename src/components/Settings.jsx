import { useState } from 'react'
import "./Settings.css"
import "bulma/css/bulma.css"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/functions'
import { useAuthState} from 'react-firebase-hooks/auth'
function Settings({ initialTime, initialBreakTime, onTimerUpdate, onBreakUpdate }) {
    initialTime = parseInt(initialTime);
    initialTime = Math.max(1, initialTime);
    initialTime = Math.min(59, initialTime);
    initialBreakTime = parseInt(initialBreakTime);
    initialBreakTime = Math.max(1, initialBreakTime);
    initialBreakTime = Math.min(59, initialBreakTime);
    const [ambientNoise, setAmbientNoise] = useState(50);
    const [timerLength, setTimerLength] = useState(initialTime);
    const [breakLength, setBreakLength] = useState(initialBreakTime);
    const [volume, setVolume] = useState(75);



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
  const [user] =useAuthState(auth);
    function ClearButton () {
        const uid = auth.currentUser.uid;
    const userRef = firestore.collection("studysessions");
    const query = userRef.where("uid", "==", auth.currentUser.uid);
    
        return(
        <div className= "input-wrapper">{}
                    <button className="button" onClick={() => {
                        const userProfile = firestore.collection("data").doc(uid);
                        userProfile.set({ 
                            studyhours: 0,
                          })
                query.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    doc.ref.delete();
                    });
                })
                }}>Clear Session Log</button>
                </div> 
        )
    }
    const onTimerChange = (event) => {
        setTimerLength(event.target.value);
        if (event.target.value) {
            onTimerUpdate(parseInt(event.target.value) * 60);
        }
    }
    const onBreakChange = (event) => {
        setBreakLength(event.target.value);
        if (event.target.value) {
            onBreakUpdate(parseInt(event.target.value) * 60);
        }
    }

    return (
        <div className="settings-card">
            <div className="settings-card-content">
                <div className="input-wrapper">
                    <label htmlFor="ambientNoise">Ambient Noise</label>
                    <div className='slider'>
                        <p>{ambientNoise}</p>
                        <input
                            className="range"
                            type="range"
                            min="0"
                            max="100"
                            value={ambientNoise}
                            onChange={(e) => setAmbientNoise(e.target.value)}
                            id="ambientNoise"
                            name="ambientNoise"
                        />
                    </div>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="timerLength">Timer Length (in minutes)</label>
                    <input
                        className="input"
                        type="number"
                        pattern="[0-9]*"
                        min="1"
                        max="60"
                        value={timerLength}
                        onChange={onTimerChange}
                        id="timerLength"
                        name="timerLength"
                    />
                </div>
                <div className='input-wrapper'>
                    <label htmlFor="breakLength">Break Length (in minutes)</label>
                    <input
                        className="input"
                        type="number"
                        min="1"
                        max="60"
                        value={breakLength}
                        onChange={onBreakChange}
                        id="breakLength"
                        name="breakLength"
                    />
                </div>
                {user ?  <ClearButton />: <></>}
                
            </div>
        </div>
    );
}


export default Settings;