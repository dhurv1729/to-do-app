import React, { useRef } from 'react';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import Header from './components/Header';
import Main from './components/Main';
import './App.css'
import {ListProvider} from './context/ListContext.js';

function App() {

  const addTaskref = useRef();
  const editTaskref = useRef();

  return (
    <ListProvider>
      <div>
        <Header ref={addTaskref}/>
        <AddTaskForm ref={addTaskref}/>
        <EditTaskForm ref={editTaskref}/>
        <Main ref={editTaskref}/>
      </div>
    </ListProvider>
  );
}

export default App;
