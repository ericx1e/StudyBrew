import { useState, useEffect, useRef } from 'react'
import "bulma/css/bulma.css"
import "./sass/mystyles.scss"
import './App.css'
import Timer from "./components/Timer"
import User from "./components/User"
import Settings from "./components/Settings"
import About from "./components/About"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/functions'
import { increment } from 'firebase/firestore'
function App() {
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [done, setDone] = useState(false);
  const [initialTime, setInitialTime] = useState(5);
  const [initialBreakTime, setInitialBreakTime] = useState(2);
  const [tab, setTab] = useState("timer");

  const [seconds, setSeconds] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

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


  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const analytics = firebase.analytics();
  const functions = firebase.functions();


  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    document.getElementById("timer").classList.remove("paused");
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    if (document.getElementById("timer")) {
      document.getElementById("timer").classList.add("paused");
    }
  };

  const resetTimer = async () => {
    setDone(false);
    clearInterval(intervalRef.current);
    setIsRunning(false);
    if (isBreakTime) {
      setSeconds(initialBreakTime);
    } else {
      setSeconds(initialTime);
    }

    if (document.getElementById("timer")) {
      document.getElementById("timer").classList.add("paused");
    }
  };
  function SaveTime(hours) {

    const uid = auth.currentUser.uid;
    const studysession = firestore.collection("studysessions");
    const userProfile = firestore.collection("data").doc(uid);
    
    studysession.add({
      sessionstudycount: hours,
      time: firebase.firestore.Timestamp.now(),
      uid,
    })
    userProfile.update({
      studyhours: increment(hours),
    })
  }
  const onTimerEnd = () => {
    if (!isBreakTime && isRunning && !done && initialTime > 0) {
      console.log("saving time", initialTime)
      SaveTime(+((initialTime / 60).toFixed(2))); //Converts seconds to minutes and rounds to two decimals
      setDone(true);
    }

    resetTimer();
    if (!isBreakTime) {
      setSeconds(initialBreakTime);
    } else {
      setSeconds(initialTime);
    }
    setIsBreakTime(!isBreakTime);
  }

  const onTimerUpdate = (newTime) => {
    setInitialTime(newTime);
    setSeconds(newTime);
    // resetTimer();
    setDone(false);
  }

  const onBreakUpdate = (newTime) => {
    setInitialBreakTime(newTime);
    setSeconds(newTime);
    // resetTimer();
  }

  useEffect(() => {
    if (seconds == 0) {
      stopTimer();
      onTimerEnd();
    }
  }, [seconds, onTimerEnd]);


  let content = <h1>FATAL</h1>

  switch (tab) {
    case "timer":
      if (isBreakTime) {
        content = <Timer seconds={seconds} isBreak={true} initialTime={initialBreakTime} isRunning={isRunning} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} />
      } else {
        content = <Timer seconds={seconds} isBreak={false} initialTime={initialTime} isRunning={isRunning} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} />
      }
      break;
    case "user":
      content = <User />
      break;
    case "settings":
      content = <Settings initialTime={initialTime / 60} initialbreakTime={initialBreakTime / 60} onTimerUpdate={onTimerUpdate} onBreakUpdate={onBreakUpdate} />
      break;
    case "about":
      content = <About />
      break;
  }

  return (
    <section className='app'>
      <div className="body">
        {content}
      </div>

      <div className="footer">
        <div className="tabs is-centered is-medium is-fullwidth">
          <ul>
            <li className={tab == "timer" ? "is-active" : ""}>
              <a className="aaa" onClick={() => setTab("timer")}>
                <span class="icon is-small"><i class="fa fa-regular fa-hourglass" aria-hidden="true"></i></span>
                <span className="text">Timer</span>
              </a>
            </li>
            <li className={tab == "user" ? "is-active" : ""}>
              <a className="aaa" onClick={() => setTab("user")}>
                <span class="icon is-small"><i class="fa fa-solid fa-user" aria-hidden="true"></i></span>
                <span className="text">User</span>
              </a>
            </li>
            <li className={tab == "settings" ? "is-active" : ""}>
              <a className="aaa" onClick={() => setTab("settings")}>
                <span class="icon is-small"><i class="fa fa-solid fa-gear" aria-hidden="true"></i></span>
                <span className="text">Settings</span>
              </a>
            </li>
            <li className={tab == "about" ? "is-active" : ""}>
              <a className="aaa" onClick={() => setTab("about")}>
                <span class="icon is-small"><i class="fa fa-solid fa-question" aria-hidden="true"></i></span>
                <span className="text">About</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default App;
