import React, { useState } from 'react'
import './Task.css';

import {MdOutlineDeleteForever,MdEditNote} from 'react-icons/md';


const Task = ({tasks,index,deleteTask,get_singleTask}) => {
 
  return (
    <div className='task' >
        <p>{index+1} 
         <b>{tasks.name}</b>
         </p>
        <div className='task-icons'>
            <MdEditNote onClick={() =>get_singleTask(tasks)} />
            
            <MdOutlineDeleteForever  onClick={() => deleteTask(tasks._id)} />   
        </div> 
    </div>
  )
}

export default Task