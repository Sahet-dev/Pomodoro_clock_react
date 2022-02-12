

function App() {
  const audioElement = React.useRef(null);
  const [intervalId, setIntervalId] = React.useState(null);
  const [breakTime, setBreakTime] = React.useState(5 * 60);
  const [sessionTime, setSessionTime] = React.useState(25 * 60);
  const [displayTime, setDisplayTime] = React.useState(25 * 60);
  const [isOnBrk, setisOnBreak] = React.useState(false);

  React.useEffect(() => {
    setDisplayTime(sessionTime);
  }, [sessionTime]);

  React.useEffect(() => {
    if (displayTime === 0) {
      audioElement.current.currentTime = 0;
      audioElement.current.play();
      if (!isOnBrk) {
        setisOnBreak(true);
        setDisplayTime(breakTime);
      } else if (isOnBrk) {
        setisOnBreak(false);
        setDisplayTime(sessionTime);
      }
    }
  }, [displayTime, isOnBrk, breakTime, sessionTime]);

  const timerControl = () => {
    if (intervalId === null) {
      const interval = setInterval(() => {
        setDisplayTime((previousdisplayTime) => previousdisplayTime - 1);
      }, 1000);
      setIntervalId(interval);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const resetTime = () => {
    audioElement.current.pause();
    audioElement.current.currentTime = 0;
    clearInterval(intervalId);
    setIntervalId(null);
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setisOnBreak(false);
  };

  const incrementSession = () => {
    setSessionTime(sessionTime >= 60 * 60 ? sessionTime : sessionTime + 60);
  };

  const decrementSession = () => {
    setSessionTime(sessionTime <= 60 ? sessionTime : sessionTime - 60);
  };

  const minutesOnDisplay = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const minutesOnLength = (time) => {
    return time / 60;
  };

  const incrementBreak = () => {
    setBreakTime(breakTime >= 60 * 60 ? breakTime : breakTime + 60);
  };

  const decrementBreak = () => {
    setBreakTime(breakTime <= 60 ? breakTime : breakTime - 60);
  };

  return (
    <div id="App" className="center-align">
      <div className="dual-container">
          <div className="time-sets">
              <h2 id="session-label">Session Length</h2>
              <button id="session-decrement" onClick={decrementSession}>
              <i className="material-icons">arrow_downward</i>
              </button>
              <h3 id="session-length">{minutesOnLength(sessionTime)}</h3>
              <button id="session-increment" onClick={incrementSession}>
              <i className="material-icons">arrow_upward</i>
              </button>  
          </div>
          <div className="time-sets">
                    
              <h2 id="break-label">Break Length</h2>
              <button id="break-decrement" onClick={decrementBreak}>
              <i className="material-icons">arrow_downward</i>
              </button>
              <h3 id="break-length">{minutesOnLength(breakTime)}</h3>
              <button id="break-increment" onClick={incrementBreak}>
              <i className="material-icons">arrow_upward</i>
              </button>
              <audio
                src="./clip/fairy-bells.wav"
                id="beep"
                ref={audioElement}
              ></audio>      
          </div>
        
          </div>
        

        


      <h1 id="timer-label">{isOnBrk ? "Break" : "Session"}</h1>
      <h2 id="time-left">{minutesOnDisplay(displayTime)}</h2>
      <button id="start_stop" onClick={timerControl}>
      <i className="material-icons">pause_circle_filled</i>
      <i className="material-icons">play_circle_filled</i>
      </button>
      <button id="reset" onClick={resetTime}>
      <i className="material-icons">autorenew</i>
      </button>

    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));


