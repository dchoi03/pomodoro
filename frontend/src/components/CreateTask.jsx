import { useState } from 'react'
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";

function CreateTask({ onTaskCreated }) {

  const BASE_URL = import.meta.env.VITE_API_URL
  const [openModal, setOpenModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [pomodoros, setPomodoros] = useState(1)

  function onCloseModal() {
    setOpenModal(false);
    setTaskName('');
    setPomodoros('')
  }

  const handleSession =  async () => {
    const newTask = {
      task_name: taskName,
      estimated_pomodoros: pomodoros,
      duration: calculateDuration(pomodoros), // or keep Date.now() if you prefer
    };

    const token = JSON.parse(localStorage.getItem('access_token'))
    console.log(token)
    // console.log(BASE_URL)

    const result = await fetch(`${BASE_URL}/tasks`,{
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })

    if (!result.ok) {
      const error = await result.json()
      throw new Error(error.detail)
    }
    
    onTaskCreated()
    onCloseModal(); // Close the modal
  };

  const calculateDuration = (pomodoros) => {
    const totalMinutes = pomodoros * 25 + pomodoros*5;

    if (totalMinutes < 60) {
      return `${totalMinutes} mins`;
    } else {
      const hours = (totalMinutes / 60).toFixed(1); // 1 decimal place
      return `${hours} hrs`;
    }
  };

  return (
    <>
      <Button className="w-48 font-bold text-md hover: bg-green-800" color="green" pill onClick={() => setOpenModal(true)}>Create a task</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className='space-y-8'>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">To focus on today!</h3>
            <div>
              <div className="mb-2 block">
                <Label>Task Name</Label>
              </div>
              <TextInput
                id="text"
                placeholder="Enter Task here"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label>Estimate Pomodoros</Label>
              </div>
              <TextInput 
                id="sessions" 
                type="number" 
                required 
                placeholder='Enter Number'
                value={pomodoros}
                onChange={(e) => setPomodoros(e.target.value)}
                />
            </div>
            <div className='flex justify-center items-center'>
              <Button color="green" onClick={handleSession}>Create</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );

}

export default CreateTask