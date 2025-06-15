import React from 'react'
import PomodoroTimer from '../components/PomodoroTimer'

function HomePage() {
  return (
    <div className='flex flex-col items-center h-screen'>
      <h1 className='text-white text-3xl font-bold'>Lets Focus</h1>
      <div>
        <PomodoroTimer/>
      </div>
    </div>
  )
}

export default HomePage