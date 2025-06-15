import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react'

function PomodoroTimer() {

  const [time, setTime] = useState(1500000)
  const [isBreak, setIsBreak] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [studyIntervals, setStudyIntervals] = useState(0)

  useEffect(() => {
    if (!isRunning || time <= 0) return;

    const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1000)
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(()=> {
    if (time > 0) return;

    setIsRunning(false)

    if (!isBreak) {
      setIsBreak(true);
      setStudyIntervals((prev) => prev + 1);
    } else {
      setIsBreak(false)
    }

  },[time])

  useEffect(() => {
    if (isBreak) {
      if (studyIntervals === 4) {
        setTime(1800000); // long break
        setStudyIntervals(0);
      } else {
        setTime(300000); // short break
      }
      setIsRunning(true); // start the break
    } else if (time === 0 && !isBreak) {
      setTime(1500000); // next focus session
      setIsRunning(true);
    }
  }, [isBreak]);



  const formattedTime = (milliseconds) => {
    let total_secs = parseInt(Math.floor(milliseconds/1000))
    let total_minutes = parseInt(Math.floor(total_secs/60))

    let seconds = parseInt(total_secs % 60)
    let minutes = parseInt(total_minutes % 60)

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  const handleTimer = () => {
    setIsRunning((prev) => !prev)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsBreak(false)
    setTime(1500000)
    setStudyIntervals(0)
  }

  return (
    <div>
      <div className='text-white text-4xl'>
        {formattedTime(time)}
        <Button onClick={handleTimer}>
          {
          (!isRunning && time == 1500000) ? 'Start'
          : 
          (isRunning ? 'Pause' : 'Resume')
          }
        </Button>
        {
          (time != 1500000) ?
          <Button onClick={resetTimer}>Reset</Button>
          : null
        }
      </div>
      <div className='text-white'>
        {studyIntervals}
      </div>
    </div>
  )
}

export default PomodoroTimer