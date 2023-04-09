import { useState, useEffect, useRef } from 'react'
import "bulma/css/bulma.css"
import "./sass/mystyles.scss"
import './App.css'
import Timer from "./components/Timer"
import User from "./components/User"
import Settings from "./components/Settings"
import About from "./components/About"

function App() {
  const [initialTime, setInitialTime] = useState(5);
  const [initialBreakTime, setInitialBreakTime] = useState(5 * 60);
  const [tab, setTab] = useState("timer");

  const [seconds, setSeconds] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

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
    // document.getElementById("timer").classList.add("paused");
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(totalTime);
    document.getElementById("timer").classList.remove("paused");
  };

  const onTimerEnd = () => {
    alert("BITCH TIMES UP")
  }

  const onTimerUpdate = (newTime) => {
    setInitialTime(newTime);
    console.log(newTime);
    setSeconds(initialTime);
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
              <a className="aaa" onClick={() => setTab("timer")}>
                <span>Timer</span>
              </a>
            </li>
            <li className={tab == "user" ? "is-active" : ""}>
              <a className="aaa" onClick={() => setTab("user")}>
                <span>User</span>
              </a>
            </li>
            <li className={tab == "settings" ? "is-active" : ""}>
              <a className="aaa" onClick={() => setTab("settings")}>
                <span>Settings</span>
              </a>
            </li>
            <li className={tab == "about" ? "is-active" : ""}>
              <a className="aaa" onClick={() => setTab("about")}>
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
