import { useState } from 'react'
import "./sass/mystyles.scss"
import "bulma/css/bulma.css"
import './App.css'
import Timer from "./components/Timer"
import User from "./components/User"
import Settings from "./components/Settings"


function App() {
  const [tab, setTab] = useState("timer");

  let content = <h1>FATAL</h1>

  switch (tab) {
    case "timer":
      content = <Timer />
      break;
    case "user":
      content = <User />
      break;
    case "settings":
      content = <Settings />
  }

  return (
    <section className='hero is-fullheight'>
      <div className="hero-body">
        {content}
      </div>

      <div className="hero-foot">
        <div className="tabs is-centered is-boxed is-medium is-fullwidth">
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
