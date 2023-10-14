"use client";

import React, { Component } from 'react';
import './style.css';
import Draggable from 'react-draggable';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studyTime: 1,
      breakTime: 2,
      currentTime: 1 * 60,
      isRunning: false,
      isBreakTime: false,
      settings: false,
    };
  }

  componentDidMount() {
    this.timerInterval = null;
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  startTimer = () => {
    this.setState({ isRunning: true });
    this.timerInterval = setInterval(this.tick, 1000);
  };

  pauseTimer = () => {
    clearInterval(this.timerInterval);
    this.setState({ isRunning: false });
  };

  resetTimer = () => {
    clearInterval(this.timerInterval);
    this.setState({
      currentTime: this.state.studyTime * 60,
      isRunning: false,
      isBreakTime: false,
    });
  };

  tick = () => {
    if (this.state.currentTime > 0) {
      this.setState({ currentTime: this.state.currentTime - 1 });
    } else {
      this.switchToNextPhase();
    }
  };

  switchToNextPhase = () => {
    if (this.state.currentTime === 0) {
      if (this.state.isRunning) {
        // Switch to break time
        this.setState({
          currentTime: this.state.breakTime * 60,
          isBreakTime: true,
        });
      } else {
        // Switch to study time
        this.setState({
          currentTime: this.state.studyTime * 60,
          isBreakTime: false,
        });
      }
    }
  };

  handleStudyTimeChange = (event) => {
    this.setState({ studyTime: event.target.value });
  };

  handleBreakTimeChange = (event) => {
    this.setState({ breakTime: event.target.value });
  };

  settings = () => {
    this.setState({ settings: !this.state.settings });
  }

  resetTimerSettings = () => {
    clearInterval(this.timerInterval);
    this.setState({
      currentTime: this.state.studyTime * 60,
      isRunning: false,
      isBreakTime: false,
      settings: false,
    });
  }

  render() {
    const { currentTime, studyTime, breakTime, isRunning, isBreakTime, settings } = this.state;

    const formatTime = (timeInSeconds) => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
      <Draggable
        defaultPosition={{ x: 750, y: 300 }}>
        <div>
          {/* TIMER */}
          <div className={settings ? 'timer2-container-disabled' : 'timer2-container-active'}>
            <h1>{isBreakTime ? 'BREAK TIME' : 'STUDY TIME'}</h1>
            <p>{formatTime(currentTime)}</p>
            <div className='buttons'>
              <button onClick={this.startTimer} disabled={isRunning}>Start</button>
              <button onClick={this.pauseTimer} disabled={!isRunning}>Pause</button>
              <button onClick={this.resetTimer}>Reset</button>
            </div>
            <div className='buttons'>
              <button onClick={this.settings}>Settings</button>
            </div>
          </div>

          {/* SETTINGS */}
          <div className={settings ? 'timer-settings-active' : 'timer-settings'}>
            <div>
              <label>Study Time (minutes):</label>
              <input
                type="number"
                value={studyTime}
                onChange={this.handleStudyTimeChange}
                className='text-black'
              />
            </div>
            <div>
              <label>Break Time (minutes):</label>
              <input
                type="number"
                value={breakTime}
                onChange={this.handleBreakTimeChange}
                className='text-black'
              />
            </div>
            <button onClick={this.resetTimerSettings}>Reset</button>
          </div>
        </div>
      </Draggable>
    );
  }
};

export default Timer;
