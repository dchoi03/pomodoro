import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Checkbox } from "flowbite-react";

function TasksTable({ refreshFlag }) {

  const BASE_URL = import.meta.env.VITE_API_URL
  const [tasks, setTasks] = useState([]);
  const token = JSON.parse(localStorage.getItem('access_token'))

  useEffect(() => {
    try {
      const fetchTasks = async () => {
        const result = await fetch(`${BASE_URL}/tasks/list`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${token}`}
        })
        if (result.ok) {
          const res = await result.json()
          console.log(res)
          setTasks(res)
        }
      }
      fetchTasks();
    } catch (error) {
      console.error(error.message)
    }
  },[refreshFlag]);

  const handleComplete = async taskId => {
    try {
      const res = await fetch(`${BASE_URL}/tasks/${taskId}/complete`, {
        method:  "PUT",
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (!res.ok) {
        throw new Error("Could not mark complete")
      }
      setTasks(tasks =>
        tasks.map(task =>
          task.id === taskId ? { ...task, completed_task: true } : task
        )
      )

      console.log("Task marked complete:", taskId)
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <div className="overflow-hidden rounded-xl shadow-lg bg-gray-400 w-full max-w-4xl mx-auto">
      <Table className='table-auto w-full text-center bg-gray-600'>
        <TableHead>
          <TableRow className="text-center align-middle text-lg">
            <TableHeadCell>Task</TableHeadCell>
            <TableHeadCell>Pomodoros</TableHeadCell>
            <TableHeadCell>Total Duration</TableHeadCell>
            <TableHeadCell>Completed</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {
            tasks.length > 0 ? (
              tasks.map((task,index) => (
                <TableRow key={index} className="text-center align-middle">
                  <TableCell>{task.task_name}</TableCell>
                  <TableCell>{task.estimated_pomodoros}</TableCell>
                  <TableCell>{task.duration}</TableCell>
                  <TableCell><Checkbox checked={task.completed_task} onChange={() => handleComplete(task.id)}/></TableCell>
              </TableRow>
              ))
            ) : (
             <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-400 text-lg">
                No tasks found
              </TableCell>
            </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
  );
}

export default TasksTable