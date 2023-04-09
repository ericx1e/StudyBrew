import "./Timer.css"
import Wave from 'react-wavify'

function Timer({ seconds, initialTime, isRunning, startTimer, stopTimer, resetTimer }) {

    const minWaveHeight = 200;

    const secondsToString = () => {
        const m = parseInt(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    const waveHeight = seconds / initialTime * minWaveHeight;
    // console.log(waveHeight)

    return (
        <div className="timer-container">
            {isRunning && <div className="drop"></div>}
            {!isRunning && (
                <button onClick={startTimer}>Start</button>
            )}
            {isRunning && (
                <button onClick={stopTimer}>Stop</button>
            )}
            <button onClick={resetTimer}>Reset</button>
            <h1 id="timer" className="timer paused">{secondsToString()}</h1>
            <div className="grow">
                {/* <img className="teacup-image" src="/teacup2.png" alt="teacup"></img> */}

                <Wave className="wave" fill='#923c01'
                    paused={false}
                    options={{
                        height: waveHeight,
                        amplitude: 5,
                        speed: 0.25,
                        points: 4
                    }}
                />
            </div>
            <div className="cup"></div>
        </div>
    );
}

export default Timer;