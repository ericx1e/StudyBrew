import { useState } from 'react'
import "./Settings.css"
function Settings({ initialTime, initialBreakTime, onTimerUpdate, onBreakUpdate }) {
    const [ambientNoise, setAmbientNoise] = useState(50);
    const [timerLength, setTimerLength] = useState(initialTime);
    const [breakLength, setBreakLength] = useState(initialBreakTime);
    const [volume, setVolume] = useState(75);

    const handleTimerSubmit = (event) => {
        event.preventDefault();
        onTimerSubmit(timerLength * 60)
    }
    const onBreakChange = (event) => {
        setBreakLength(event.target.value);
        if (event.target.value) {
            onBreakUpdate(event.target.value * 60);
        }
    }

    const onTimerChange = (event) => {
        setTimerLength(event.target.value);
        if (event.target.value) {
            onTimerUpdate(event.target.value * 60);
        }
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
                <label htmlFor="timerLength">Timer Length (in minutes)</label>
                <input
                    className="input"
                    type="number"
                    min="1"
                    max="60"
                    value={timerLength}
                    onChange={onTimerChange}
                    id="timerLength"
                    name="timerLength"
                />
                <div className='input-wrapper'>
                    <label htmlFor="breakLength">Break Length (in minutes)</label>
                    <input
                        className="input"
                        type="number"
                        min="1"
                        max="60"
                        value={breakLength}
                        onChange={onBreakChange}
                        id="breakLength"
                        name="breakLength"
                    />
                </div>
            </div>
        </div >
    );
}

export default Settings