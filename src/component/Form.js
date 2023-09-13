import React from 'react'
import './Task.css'


const Form = ({createTask,name,handleInputChange,editing,update_Task}) => {
  return (
    <form className='task-form' onSubmit={editing ? update_Task : createTask}>
        <input
        type='text'
        placeholder="Add a Task"
        name="name"
        value={name}
        onChange={handleInputChange}
        />
        <button className='--btn --btn-primary' type='submit'>Submit</button>

    </form>
  )
}

export default Form