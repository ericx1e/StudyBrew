import { useState } from 'react'
import "./Settings.css"
import "bulma/css/bulma.css"
function Settings({ initialTime, initialBreakTime, onTimerUpdate, onBreakUpdate }) {
    initialTime = parseInt(initialTime);
    initialTime = Math.max(1, initialTime);
    initialTime = Math.min(59, initialTime);
    initialBreakTime = parseInt(initialBreakTime);
    initialBreakTime = Math.max(1, initialBreakTime);
    initialBreakTime = Math.min(59, initialBreakTime);
    const [ambientNoise, setAmbientNoise] = useState(50);
    const [timerLength, setTimerLength] = useState(initialTime);
    const [breakLength, setBreakLength] = useState(initialBreakTime);
    const [volume, setVolume] = useState(75);

    const onTimerChange = (event) => {
        setTimerLength(event.target.value);
        if (event.target.value) {
            onTimerUpdate(parseInt(event.target.value) * 60);
        }
    }
    const onBreakChange = (event) => {
        setBreakLength(event.target.value);
        if (event.target.value) {
            onBreakUpdate(parseInt(event.target.value) * 60);
        }
    }

    return (
        <div className="settings-card">
            <div className="settings-card-content">
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
                        pattern="[0-9]*"
                        min="1"
                        max="60"
                        value={timerLength}
                        onChange={onTimerChange}
                        id="timerLength"
                        name="timerLength"
                    />
                </div>
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
        </div>
    );
}


export default Settings;