import React from 'react'
import PomodoroTimer from '../components/PomodoroTimer'
import TasksTable from '../components/TasksTable'
import CreateTask from '../components/CreateTask'
import { useState } from 'react'
import { useEffect } from 'react'

function HomePage() {
  
  const [refreshFlag, setRefreshFlag] = useState(0)


    const handleTaskCreated = () => {
      setRefreshFlag(prev => prev + 1)
    }

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
        <CreateTask onTaskCreated={handleTaskCreated}/>
      </div>
      <div className='mt-6'>
        <TasksTable refreshFlag={refreshFlag}/>
      </div>
    </div>
  )
}

export default HomePage