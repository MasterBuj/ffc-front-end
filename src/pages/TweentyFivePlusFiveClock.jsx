import { useEffect, useRef, useState } from 'react';
import './styles/TweentyFivePlusFiveClock.css';

function App() {

    const breakL = 5; // 5
    const sessionL = 25; // 25

    const [breakLength, setBreakLength] = useState(breakL);
    const [sessionLength, setSessionLength] = useState(sessionL);
    const [timerLabel, setTimerLabel] = useState('Session');
    const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
    const [running, setRunning] = useState(false);

    const audioRef = useRef(null);

    const handleBreakDecrement = () => {
        if (breakLength > 1) {
            setBreakLength(breakLength - 1);
        }
    };

    const handleBreakIncrement = () => {
        if (breakLength < 60) {
            setBreakLength(breakLength + 1);
        }
    };

    const handleSessionDecrement = () => {
        if (sessionLength > 1) {
            setSessionLength(sessionLength - 1);
            if (!running) {
                setTimeLeft((sessionLength - 1) * 60);
            }
        }
    };

    const handleSessionIncrement = () => {
        if (sessionLength < 60) {
            setSessionLength(sessionLength + 1);
            if (!running) {
                setTimeLeft((sessionLength + 1) * 60);
            }
        }
    };

    const handleReset = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setBreakLength(breakL);
        setSessionLength(sessionL);
        setTimerLabel('Session');
        setTimeLeft(sessionL * 60);
        setRunning(false);
    };

    useEffect(() => {
        if (running) {
            const interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime === 1) {
                        audioRef.current.play();
                        if (timerLabel === 'Session') {
                            setTimerLabel('Break');
                            return breakLength * 60;
                        } else {
                            setTimerLabel('Session');
                            return sessionLength * 60;
                        }
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [running, breakLength, sessionLength, timerLabel]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="timer-container" style={{ background: timerLabel === 'Break' ? '#ff00005c' : null }}>
            <div className="timer">
                <div id="break-label" className='label'>Break Length</div>
                <div className="controls">
                    <button id="break-decrement" onClick={handleBreakDecrement}>-</button>
                    <div id="break-length">{breakLength}</div>
                    <button id="break-increment" onClick={handleBreakIncrement}>+</button>
                </div>
                <div id="session-label" className='label'>Session Length</div>
                <div className="controls">
                    <button id="session-decrement" onClick={handleSessionDecrement}>-</button>
                    <div id="session-length">{sessionLength}</div>
                    <button id="session-increment" onClick={handleSessionIncrement}>+</button>
                </div>
                <div id="timer-label" >{timerLabel}</div>
                <div id="time-left">{formatTime(timeLeft)}</div>
                <div className="control-main">
                    <button id="start_stop" onClick={() => setRunning(!running)}>
                        {running ? 'Pause' : 'Start'}
                    </button>
                    <button id="reset" onClick={handleReset}>Reset</button>
                    <audio
                        id="beep"
                        ref={audioRef}
                        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
