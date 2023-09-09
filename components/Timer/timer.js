"use client";

import React, { useState, useEffect } from 'react';
import './style.css';
import Draggable from 'react-draggable';

const Timer = () => {
  const formatTime = (second) => {
    let minutes = Math.floor(second / 60);
    let seconds = second % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const [time, setTime] = useState(25 * 60);
  const [formattedTime, setFormattedTime] = useState(`${formatTime(time)}`);
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          setFormattedTime(formatTime(newTime));
          return newTime;
        });
      }, 1000);
      setIntervalId(id);
    }
  };

  const stopTimer = () => {
    if (intervalId !== null) {
      setIsRunning(false);
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(25 * 60);
    setFormattedTime("25:00");
  };

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div>
      <Draggable
        defaultPosition={{ x: 750, y: 300 }}>
        <div className='timer2-container'>
          <h1>STUDY TIMER</h1>
          <p>{formattedTime}</p>
          <div className='buttons'>
            <button onClick={startTimer} disabled={isRunning}>Start</button>
            <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default Timer;
