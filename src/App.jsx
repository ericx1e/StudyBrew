import { useState } from 'react'
import './App.css'
import "bulma/css/bulma.css"
import Timer from "./components/Timer"


function App() {
  const [tab, setTab] = useState("timer");

  let content = <h1>OOPS</h1>

  switch(tab) {
    case "timer": 
      content = <Timer />
      break;
  }

  return (
    <div className = "App">
      <div className="body">
        {content}
      </div>

      <div className="tabs is-centered is-boxed is-medium">
        <ul>
          <li className={tab == "timer" ? "is-active" : ""}>
            <a onClick={() => setTab("timer")}>
              <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
              <span>Pictures</span>
            </a>
          </li>
          <li className={tab == "user" ? "is-active" : ""}>
            <a onClick={() => setTab("user")}>
              <span className="icon is-small"><i className="fas fa-music" aria-hidden="true"></i></span>
              <span>Music</span>
            </a>
          </li>
          <li className={tab == "settings" ? "is-active" : ""}>
            <a onClick={() => setTab("settings")}>
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
