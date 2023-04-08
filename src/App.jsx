import { useState } from 'react'
import "bulma/css/bulma.css"
import './App.css'
import Timer from "./components/Timer"
import User from "./components/User"


function App() {
  const [tab, setTab] = useState("timer");

  let content = <h1>FATAL</h1>

  switch(tab) {
    case "timer": 
      content = <Timer />
      break;
    case "user" :
      content = <User />
      break;
  }

  return (
    <div className="app">
      <div className="body">
        {content}
      </div>

      <div className="tabs is-centered is-boxed is-medium">
        <ul>
          <li className={tab == "timer" ? "is-active" : ""}>
            <a className="tabs" onClick={() => setTab("timer")}>
              <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
              <span>Pomodoro</span>
            </a>
          </li>
          <li className={tab == "user" ? "is-active" : ""}>
            <a className="tabs" onClick={() => setTab("user")}>
              <span className="icon is-small"><i className="fas fa-music" aria-hidden="true"></i></span>
              <span>User</span>
            </a>
          </li>
          <li className={tab == "settings" ? "is-active" : ""}>
            <a className="tabs" onClick={() => setTab("settings")}>
              <span className="icon is-small"><i className="fas fa-film" aria-hidden="true"></i></span>
              <span>Videos</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default App
