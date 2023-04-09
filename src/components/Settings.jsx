import { useState } from 'react'
import "./Settings.css"
function Settings({ initialTime, initialBreakTime, onTimerSubmit, onBreakSubmit }) {
    const [ambientNoise, setAmbientNoise] = useState(50);
    const [timerLength, setTimerLength] = useState(initialTime);
    const [breakLength, setBreakLength] = useState(initialBreakTime);
    const [volume, setVolume] = useState(75);

    const handleTimerSubmit = (event) => {
        event.preventDefault();
        onTimerSubmit(timerLength * 60)
    }
    const handleBreakSubmit = (event) => {
        event.preventDefault();
        onBreakSubmit(breakLength * 60);
    }

    return (
        <div className="input-container">
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
                <form>
                    <label htmlFor="timerLength">Timer Length (in minutes)</label>
                    <input
                        className="input"
                        type="number"
                        min="1"
                        max="60"
                        value={timerLength}
                        onChange={(e) => setTimerLength(e.target.value)}
                        onSubmit={handleTimerSubmit}
                        id="timerLength"
                        name="timerLength"
                    />
                </form>
                <form>
                    <div className='input-wrapper'>
                        <label htmlFor="breakLength">Break Length (in minutes)</label>
                        <input
                            className="input"
                            type="number"
                            min="1"
                            max="60"
                            value={breakLength}
                            onChange={(e) => setBreakLength(e.target.value)}
                            onSubmit={handleBreakSubmit}
                            id="breakLength"
                            name="breakLength"
                        />
                    </div>
                </form>
            </div>
        </div >
    );
}

export default Settings