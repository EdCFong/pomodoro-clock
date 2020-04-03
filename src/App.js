import React from 'react';
import './App.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timer: 1500
    }
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.CountDown = this.CountDown.bind(this);
  }
  breakDecrement() {
    if (this.state.breakLength > 1) {
      this.setState({
        breakLength: this.state.breakLength - 1
      });
    }
  }
  breakIncrement() {
    if (this.state.breakLength < 60) {
      this.setState({
        breakLength: this.state.breakLength + 1
      });
    }
  }
  sessionDecrement() {
    if (this.state.sessionLength > 1) {
      this.setState({
        sessionLength: this.state.sessionLength - 1
      });
    }
  }
  sessionIncrement() {
    if (this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1
      });
    }
  }
  DecrementTimer()
  {
    this.setState({
      timer: this.state.timer - 1
    });
  }
  CountDown()
  {
    var value = setInterval(() => {this.DecrementTimer()},1000);
  }
  render() {
    return (
      <div>
        <h1>Pomodoro Clock</h1>
        <div id="play-stop-buttons">
          <button id="start_stop" class="fas fa-play time-buttons" onClick={this.CountDown}></button>
          <button id="pause" class="fas fa-pause time-buttons"></button>
          <button id="reset" class="fas fa-sync-alt time-buttons"></button>
        </div>

        <div id="timer-wrapper">
          <div id="timer">
            <div id="timer-label">Session</div>
            <div id="time-left">25:00</div>
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
      </div>
    )
  }
}

export default App;