import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Checkbox } from "flowbite-react";

function SessionsTable({ tasks }) {

  const BASE_URL = import.meta.env.VITE_API_URL
  
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
                  <TableCell>{task.task}</TableCell>
                  <TableCell>{task.pomodoros}</TableCell>
                  <TableCell>{task.duration}</TableCell>
                  <TableCell><Checkbox/></TableCell>
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

export default SessionsTable