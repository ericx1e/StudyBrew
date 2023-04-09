import { useState } from 'react'
import "bulma/css/bulma.css"
import "./About.css"

function About(){
  return (
    <div>
      <div className="card-container-1">
        <div class="card">
          <div class="card-content">
            <div class="content">
              StudyBrew is intended to offer an alternative study technique that increases 
              productivity for students who find traditional methods inefficient. While 
              using a normal timer is simple, some may find that as they approach the end 
              of a session they start to lose motivation, simply waiting for the clock to 
              hit zero and ending their session earlier than they originally intended to. 
              These few minutes may seem insignificant, they stack up, and after long periods 
              of time many valuable hours of study are lost.
            </div>
            <img className="img" src="/clock.png"></img>
          </div>
        </div>
      </div>

      <div className="card-container-2">
        <div class="card">
          <div class="card-content">
            <div class="content">
              To combat this, StudyBrew removes the timer from view, putting a cup of tea in its
              place. Over the course of a study session, the length of which can still be set by
              the user, the teacup will be slowly filled, with the session ending when the cup 
              is fully filled. By hiding the timer, one can avoid the drop in productivity that 
              comes at the end of a session.
            </div>
            <img className="img" src="/cup_of_tea.png"></img>
          </div>
        </div>
      </div>

      <div className="card-container-3">
        <div class="card">
          <div class="card-content">
            <div class="content">
              Additionally, StudyBrew offers statistics for users who sign in using Google. 
              Using Google’s FireBase, we keep a record of all the logged study sessions, and 
              keep track of the total amount of time that you’ve logged, as well as the total 
              amount of tea poured. 
            </div>
            <img className="img" src="/bar_chart.png"></img>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default About