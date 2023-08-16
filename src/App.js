

import './App.css';
import Task from './component/Task';
import TaskList from './component/TaskList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const URL= process.env.REACT_APP_SERVER_URL

function App() {
  return (
    <>
     <ToastContainer/>
    <div className="app">
      
      <div className='task-container'>
      <TaskList/>
     
     
      </div>
    </div>
    </>
  );
}

export default App;
