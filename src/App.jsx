import { useState, useEffect, useRef } from 'react'
import "bulma/css/bulma.css"
import "./sass/mystyles.scss"
import './App.css'
import Timer from "./components/Timer"
import User from "./components/User"
import Settings from "./components/Settings"

function App() {
  let totalTime = 2;
  const [tab, setTab] = useState("timer");

  const [seconds, setSeconds] = useState(totalTime);
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
    document.getElementById("timer").classList.add("paused");
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

  useEffect(() => {
    if (seconds == 0) {
      stopTimer();
      onTimerEnd();
    }
  }, [seconds, onTimerEnd]);


  let content = <h1>FATAL</h1>

  switch (tab) {
    case "timer":
      content = <Timer seconds={seconds} isRunning={isRunning} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} />
      break;
    case "user":
      content = <User />
      break;
    case "settings":
      content = <Settings />
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
