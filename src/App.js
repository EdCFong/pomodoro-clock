import React from 'react';
import './App.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      value: "",   //used for the paused mechanism in the CountDown function
      countState: "paused",
      timerType: "Session"
    }
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.CountDown = this.CountDown.bind(this);
    this.ShowTime = this.ShowTime.bind(this);
    this.Reset = this.Reset.bind(this);
    this.Start = this.Start.bind(this);
  }
  breakDecrement() {
    if ((this.state.breakLength > 1) && (this.state.countState === "paused")) {
      if (this.state.timerType === "Break") {
        this.setState({
          breakLength: this.state.breakLength - 1,
          timer: (this.state.breakLength - 1) * 60
        });
      }
      else {
        this.setState({
          breakLength: this.state.breakLength - 1
        });
      }
    }
  }
  breakIncrement() {
    if ((this.state.breakLength < 60) && (this.state.countState === "paused")) {
      if (this.state.timerType === "Break") {
        this.setState({
          breakLength: this.state.breakLength + 1,
          timer: (this.state.breakLength + 1) * 60
        });
      }
      else {
        this.setState({
          breakLength: this.state.breakLength + 1
        });
      }
    }
  }
  sessionDecrement() {
    if ((this.state.sessionLength > 1) && (this.state.countState === "paused")) {
      if (this.state.timerType === "Session") {
        this.setState({
          sessionLength: this.state.sessionLength - 1,
          timer: (this.state.sessionLength - 1) * 60
        });
      }
      else {
        this.setState({
          sessionLength: this.state.sessionLength - 1
        });
      }
    }
  }
  sessionIncrement() {
    if ((this.state.sessionLength < 60) && (this.state.countState === "paused")) {
      if (this.state.timerType === "Session") {
        this.setState({
          sessionLength: this.state.sessionLength + 1,
          timer: (this.state.sessionLength + 1) * 60
        });
      }
      else {
        this.setState({
          sessionLength: this.state.sessionLength + 1
        });
      }
    }
  }
  Start() {
    if (this.state.timerType === "Session") {
      this.setState({
        timerType: "Break",
        timer: this.state.breakLength * 60,
        countState: "paused"
      });
      this.CountDown();
    }
    else {
      this.setState({
        timerType: "Session",
        timer: this.state.sessionLength * 60,
        countState: "paused"
      });
      this.CountDown();
    }
  }
  DecrementTimer() {
    if (this.state.timer === 0) {
      clearInterval(this.state.value);
      this.audioBeep.play();
      setTimeout(this.Start(), 1000);
    }
    else {
      this.setState({
        timer: this.state.timer - 1
      });
    }
  }
  CountDown() {
    if (this.state.countState === "paused") {
      var num = setInterval(() => { this.DecrementTimer() }, 1000);
      this.setState({
        value: num,
        countState: "counting"
      });
    }
    else {
      this.setState({ countState: "paused" });
      clearInterval(this.state.value);
    }
  }
  ShowTime() {
    var minutes = Math.floor(this.state.timer / 60);
    var seconds = this.state.timer % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ":" + seconds;
  }
  Reset() {
    clearInterval(this.state.value);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      value: "",
      countState: "paused",
      timerType: "Session"
    });
  }
  render() {
    return (
      <div>
        <h1>Pomodoro Clock</h1>
        <div id="play-stop-buttons">
          <button id="start_stop" className='time-buttons' onClick={this.CountDown}>
            <i className="fas fa-play">&nbsp;</i>
            <i className="fas fa-pause"></i>
          </button>
          <button id="reset" className="fas fa-sync-alt time-buttons" onClick={this.Reset}></button>
        </div>

        <div id="timer-wrapper">
          <div id="timer">
            <div id="timer-label">{this.state.timerType}</div>
            <div id="time-left">{this.ShowTime()}</div>
          </div>
        </div>

        <div id="labels">
          <div id="break-label">
            Break Length
            <div>
              <div id="break-length">{this.state.breakLength}</div>
              <div id="break-buttons">
                <button id="break-decrement" class="fas fa-angle-down time-buttons" onClick={this.breakDecrement}> </button>
                <button id="break-increment" class="fas fa-angle-up time-buttons" onClick={this.breakIncrement}> </button>
              </div>
            </div>
          </div>
          <div id="session-label">
            Session Length
            <div>
              <div id="session-length">{this.state.sessionLength}</div>
              <div id="session-buttons">
                <button id="session-decrement" class="fas fa-angle-down time-buttons" onClick={this.sessionDecrement}></button>
                <button id="session-increment" class="fas fa-angle-up time-buttons" onClick={this.sessionIncrement}></button>
              </div>
            </div>
          </div>

        </div>
        <audio id="beep" preload="auto"
          src="https://goo.gl/65cBl1"
          ref={(audio) => { this.audioBeep = audio; }} />
      </div>
    )
  }
}

export default App;