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
function App() {
  const [initialTime, setInitialTime] = useState(5);
  const [initialBreakTime, setInitialBreakTime] = useState(5 * 60);
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

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(totalTime);
    document.getElementById("timer").classList.remove("paused");
  };
  function SaveTime(hours) {

    const studysession = firestore.collection("studysessions");
    console.log(studysession)
    const uid = auth.currentUser.uid;
  
    studysession.add({
      sessionstudycount: hours,
      time: firebase.firestore.Timestamp.now(),
      uid,
    })
  }
  const onTimerEnd = () => {
    SaveTime(1)
  }

  const onTimerUpdate = (newTime) => {
    setInitialTime(newTime);
    setSeconds(newTime);
  }

  const onBreakUpdate = (newTime) => {
    setBreakInitialTime(newTime);
    setSeconds(initialTime);
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
      content = <Timer seconds={seconds} initialTime={initialTime} isRunning={isRunning} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} />
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
              <a onClick={() => setTab("timer")}>
                <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
                <span>Timer</span>
              </a>
            </li>
            <li className={tab == "user" ? "is-active" : ""}>
              <a onClick={() => setTab("user")}>
                <span className="icon is-small"><i className="fas fa-music" aria-hidden="true"></i></span>
                <span>User</span>
              </a>
            </li>
            <li className={tab == "settings" ? "is-active" : ""}>
              <a onClick={() => setTab("settings")}>
                <span className="icon is-small"><i className="fas fa-film" aria-hidden="true"></i></span>
                <span>Settings</span>
              </a>
            </li>
            <li className={tab == "about" ? "is-active" : ""}>
              <a onClick={() => setTab("about")}>
                <span className="icon is-small"><i className="fas fa-film" aria-hidden="true"></i></span>
                <span>About</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default App;
