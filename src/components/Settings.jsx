import { useState } from 'react'
import "./Settings.css"
function Settings() {
    const [ambientNoise, setAmbientNoise] = useState(50);
    const [timerLength, setTimerLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [volume, setVolume] = useState(75);
    return (
        <div className="input-container">
            <div className="input-wrapper">
                <label htmlFor="ambientNoise">Ambient Noise</label>
                <div className='slider'>
                <p>{ambientNoise}</p>
                <input
                    class="range"
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
                    class="input"
                    type="number"
                    min="1"
                    max="60"
                    value={timerLength}
                    onChange={(e) => setTimerLength(e.target.value)}
                    id="timerLength"
                    name="timerLength"
                />
                <div className='input-wrapper'>
                    <label htmlFor="breakLength">Break Length (in minutes)</label>
                    <input
                        class="input"
                        type="number"
                        min="1"
                        max="60"
                        value={breakLength}
                        onChange={(e) => setBreakLength(e.target.value)}
                        id="breakLength"
                        name="breakLength"
                    />
                </div>
            </div>
        </div>
    );
}

export default Settings