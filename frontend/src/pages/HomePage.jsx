import React from 'react'
import PomodoroTimer from '../components/PomodoroTimer'
import SessionsTable from '../components/SessionsTable'
import CreateTask from '../components/CreateTask'
import { useState } from 'react'
import { useEffect } from 'react'

function HomePage() {

  const BASE_URL = import.meta.env.VITE_API_URL
  const [userId,setUserId] = useState(null)
  const [tasks, setTasks] = useState([]);

  return (
    <div className='flex items-center flex-col h-screen'>
      <h1 className='text-white text-6xl font-bold mt-8'>
        Pomodoro Timer
      </h1>
      <h2 className='flex items-center justify-center text-white text-xl font-bold my-8'>Time to Focus!</h2>
      <div className="bg-gray-700 w-full max-w-xl justify-center items-center rounded-lg mb-8">
        <PomodoroTimer/>
      </div>
      <div>
        <CreateTask setTasks={setTasks}/>
      </div>
      <div className='mt-6'>
        <SessionsTable tasks={tasks}/>
      </div>
    </div>
  )
}

export default HomePage