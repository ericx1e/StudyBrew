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
            <h1 id="timer" className="timer paused">{isBreak ? "Relax for" : "Focus for"} {secondsToString()}</h1>
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
                
            </div>
            <div className="start-stop">
                {isRunning && <div className="drop"></div>}
                <div className="start">
                    {!isRunning && (
                        <button className="button is-success is-outlined is-rounded is-large" onClick={startTimer}>
                            <i className="fa fa-solid fa-play"></i>
                            Start
                        </button>
                    )}
                    {isRunning && (
                        <button className="button is-danger is-outlined is-rounded is-large" onClick={stopTimer}>
                            <i className="fa fa-solid fa-pause"></i>
                            Pause
                        </button>
                    )}
                </div>
                <div className="stop">
                    <button className="button is-link is-outlined is-rounded is-large" onClick={resetTimer}>
                        <i className="fa fa-solid fa-rotate-right"></i>
                        Reset
                    </button>
                </div>
                
            </div>
            
        </div>
    );
}

export default Timer;