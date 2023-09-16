
import Form from './Form'
import Task from './Task'
import axios from 'axios'
import {URL} from '../App'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import loadingIMG from './assets/loading.gif'
const [isLoading, setIsLoading] = useState(false);

const TaskList = () => {
  const [formData, setFormData] = useState({name:''})
  const {name}=formData 
  const [editing, setEditing] = useState(false)
  const [taskID, setTaskID] = useState("")
  const URL ="https://crudbackend-5qnk.onrender.com"
  // creating task 
const [tasks, setTasks] = useState([])
  const handleInputChange=(e)=>{
    const {name,value}=e.target
    setFormData({...formData,[name]:value})

  }

const createTask = async(e) =>{
    e.preventDefault()
try {
    await axios.post(`${URL}/api/tasks/`,formData)
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
      const {data} = await axios.get(`${URL}/api/tasks/`)
      setTasks(data)
      // console.log(data);
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
     await axios.delete(`${URL}/api/tasks/${id}`);
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


  const getSingleTask = async (tasks) =>{
    setFormData({name: tasks.name});
    setTaskID(tasks._id);
    setEditing(true)
 }


// update a task
const updateTask = async (e) =>{
  // e.preventDefault()
 
  try {
    await axios.put(
      `${URL}/api/tasks/${taskID}`, formData
      
    )
  setFormData({...formData, name:""})
  toast.success('task updated')
  getAllTask()
  } catch (error) {
    // alert(error.message)
    toast.error("not updated")
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
          isLoading &&(
            <div className='--flex-center'>
              <img src={loadingIMG}/>
            </div>
          )
        }
        {
          !isLoading && tasks.length === 0 ? (
            <p >No Task Found, Add  A Task </p>
          ):(<>{
  Array.isArray(tasks) ? (
    tasks.map((data, index) => (
      <Task
        tasks={data}
        key={data._id}
        index={index}
        deleteTask={deleteTask}
        getSingleTask={getSingleTask}
        updateTask={updateTask}
      />
    ))
  ) : (
    <p>No tasks available.</p>
  )
}</>)
        }
       <Form handleInputChange={handleInputChange} createTask={createTask} name={name} />
    </div>
  )
}

export default TaskList 