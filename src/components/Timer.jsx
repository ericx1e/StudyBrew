import "./Timer.css"
import Wave from 'react-wavify'
import "bulma/css/bulma.css"
import "../sass/mystyles.scss"

function Timer({ seconds, isBreak, initialTime, isRunning, startTimer, stopTimer, resetTimer }) {

    const minWaveHeight = 200;

    const secondsToString = () => {
        const m = parseInt(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    const waveHeight = seconds / initialTime * minWaveHeight;
    // console.log(waveHeight)

    return (
        <div className="timer-container bg-text" data-bg-text="text">
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
            <div className="cup">
                <h1 className={isBreak ? "relax" : "focus"}>{isBreak ? "Relax" : "Focus"}</h1>
            </div>
            <div className="start-stop">
                {isRunning && <div className="drop"></div>}
                {!isRunning && (
                    <button class="button is-success is-outlined is-rounded" onClick={startTimer}>Start</button>
                )}
                {isRunning && (
                    <button class="button is-danger is-outlined is-rounded" onClick={stopTimer}>Stop</button>
                )}
                <button class="button is-link is-outlined is-rounded" onClick={resetTimer}>Reset</button>
            </div>
            
        </div>
    );
}

export default Timer;