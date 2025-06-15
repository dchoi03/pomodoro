import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react'
import { logSession } from '../api/sessions'

function PomodoroTimer() {

  const [time, setTime] = useState(1000)
  const [isBreak, setIsBreak] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [studyIntervals, setStudyIntervals] = useState(0)
  const [startTime, setStartTime] = useState(null)

  useEffect(() => {
    if (!isRunning || time <= 0) return;

    const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1000)
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(()=> {
    if (time > 0) return;
    
    const endTime = Date.now()
    const duration = endTime - startTime
    const token = localStorage.getItem('access_token')

    if(token && startTime) {
      logSession({ token, duration })
      .then(() => console.log("session logged"))
      .catch((err) => console.error("Failed to log sessions", err))
    }

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
    } else if (time === 0 && !isBreak) {
      setTime(1500000); // next focus session
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
    if(!isRunning) {
      setStartTime(Date.now())
    }
    setIsRunning((prev) => !prev)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsBreak(false)
    setTime(1500000)
    setStudyIntervals(0)
  }

  return (
    <div className='text-white text-7xl flex flex-col items-center my-8'>
      <div className='text-white text-5xl mb-6'>
        Sessions: {studyIntervals}
      </div>
      {formattedTime(time)}
      <div className=' flex flex-row m-4'>
        <Button
          onClick={handleTimer}
          className={`mt-4 mr-3 px-4 w-36 font-semibold text-white transition-colors duration-300 ${
            isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {
            (!isRunning && time === 1500000) ? 'Start'
            : (isRunning ? 'Pause' : 'Resume')
          }
        </Button>

        {
          (isRunning || time != 1500000) ?
          <Button className="w-36 bg-gray-500 font-semibold text-white px-4 py-4 mt-4 hover:bg-gray-600 duration-300" onClick={resetTimer}>
            Reset
          </Button>
          : null
        }
      </div>
    </div>
  )
}

export default PomodoroTimer