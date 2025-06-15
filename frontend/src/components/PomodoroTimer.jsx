import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react'

function PomodoroTimer() {

  const [time, setTime] = useState(1500000)
  const [isBreak, setIsBreak] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [studyIntervals, setStudyIntervals] = useState(0)

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);


  const formattedTime = (milliseconds) => {
    let total_secs = parseInt(Math.floor(milliseconds/1000))
    let total_minutes = parseInt(Math.floor(total_secs/60))

    let seconds = parseInt(total_secs % 60)
    let minutes = parseInt(total_minutes % 60)

    return `${minutes}:${seconds}`
  }

  const handleTimer = () => {
    setIsRunning((prev) => !prev)
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
      </div>
    </div>
  )
}

export default PomodoroTimer