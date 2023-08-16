
import Form from './Form'
import Task from './Task'
import axios from 'axios'
import {URL} from '../App'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const TaskList = () => {
  const [formData, setFormData] = useState({name:''})
  const {name}=formData 
  const [IsEditing, setIsEditing] = useState(false)
  const [taskID, setTaskID] = useState("")
  // creating task 
const [tasks, setTasks] = useState([])
  const handleInputChange=(e)=>{
    const {name,value}=e.target
    setFormData({...formData,[name]:value})

  }

const createTask = async(e) =>{
    e.preventDefault()
try {
    await axios.post('https://crudbackend-5qnk.onrender.com/',formData)
  toast.success("Task create successful")
    // console.log(formData)
    getAllTask()
    setFormData({ name: '' });    
} catch (error) {
  //  console.log(error);
    toast.error(error)
}
  }
  // getting all task 
  const getAllTask = async() =>{
    try {
      const {data} = await axios.get('https://crudbackend-5qnk.onrender.com/')
      setTasks(data)
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() =>{
    getAllTask()
  },[])
// to delete task 
  const deleteTask = async(id) =>{
    try {
     await axios.delete(`https://crudbackend-5qnk.onrender.com/${id}`);
      // setTasks(data)
      const updatedTasks = tasks.filter((tasks) => tasks._id !== id)
      setTasks(updatedTasks)
      toast.success('task deleted successfully')
     getAllTask()
    } catch (error) {
      // console.log(error)
      toast.error('task was not deleted')
    }
  }

  
  // const updateTaskById = async(id,updateTask) =>{
  //   try {
  //     const {data} = await axios.patch(`http://localhost:7000/api/tasks/${id}`,updateTask)
  //     setTasks(data)
  //     console.log(data);
  //     toast.success('updated succefully')
  //   } 
  //   catch (error) {
  //     console.log(error)
  //     toast.error('not updated')
  //   }   
  // }
  // useEffect(() =>{
  //   getAllTask()
  // },[])
    const getSingleTask = async(task) =>{
    try {
      setFormData({name:task.name})
      setIsEditing(true)
      setTaskID(task._id)
      toast.success('updated succefully')
    } 
    catch (error) {
      console.log(error)
      toast.error('not updated')
    }   
  }
  const updateTaskById = async(e) =>{
    e.preventDefault()
    if (name === "") {
      return alert("input field cant be empty")
    }
    try {
       await axios.patch(`https://crudbackend-5qnk.onrender.com/${taskID}`,formData)
       setFormData({...formData,name:""})
       setIsEditing(false)
       getAllTask()
      toast.success('updated succefully')
    } 
    catch (error) {
      console.log(error)
      toast.error('not updated')
    }   
  }
  return (
    <div>
       <h1 className='--center-all --text-purple'>MANAGER</h1> 
       <div className="--flex-between --pb">
          <h3>
            <b>Total Tasks:</b> {tasks.length}
          </h3>
          <h3>
            <b>Completed Tasks:</b> 0
          </h3>
        </div>
        {
  Array.isArray(tasks) ? (
    tasks.map((data, index) => (
      <Task
        tasks={data}
        key={data._id}
        index={index}
        deleteTask={deleteTask}
        getSingleTask={getSingleTask}
        updateTaskById={updateTaskById}
      />
    ))
  ) : (
    <p>No tasks available.</p>
  )
}

       <Form handleInputChange={handleInputChange} createTask={createTask} name={name} />
    </div>
  )
}

export default TaskList