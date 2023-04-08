import { useState } from 'react'
import "bulma/css/bulma.css"
import "./About.css"

function About(){
  return (
    <div>
      <h1 className='Header'>About StudyBrew</h1>
      <br></br>

      <p className='Paragraph One'>Studybrew is intended to offer an alternative study technique that increases productivity for students who find traditional methods inefficient. While using a normal timer is simple, some may find that as they approach the end of a session they start to lose motivation, simply waiting for the clock to hit zero and ending their session earlier than they originally intended to. These few minutes may seem insignificant, but imagine you cut 5 minutes off of each hour you study; if you were to study 2 hours a day, after a week you would have missed 70 minutes of study time. </p>
      <br></br>
      <p className='Paragraph Two'>To combat this, Studybrew removes the timer from view, putting a cup of tea in its place. Over the course of a study session, the length of which can still be set by the user, the teacup will be slowly filled, with the session ending when the cup is fully filled. By hiding the timer, one can avoid the drop in productivity that comes at the end of a session.</p>
    </div>
  )
}

export default About