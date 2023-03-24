import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import Task from '../Task.js'
import {useListContext} from '../context/ListContext.js'

const AddTaskForm = React.forwardRef((props, ref) => {

  const {setDoList, doList} = useListContext();

  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('none');
  const [description, setDescription] = useState('');

  function submitHandler(event) {
    const task = new Task();
    task.title = title;
    task.deadline = deadline;
    task.description = description;
    task.priority = priority;
    task.taskid = Date.now();
    setDoList([task, ...doList]);
    ref.current.style.display = 'none';

  }

  function closeHandler() {
    ref.current.style.display = 'none';
  }
  

  return (
    <Div ref={ref} className="modal">

      <div className="container">
        <span className="close" onClick={closeHandler}>&times;</span>
        <header className="form-header">Add Task</header>
        <form className="form add-task" onSubmit={submitHandler}>

          <label for="title">Task Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>

          <label for="deadline">Deadline</label>
          <input type="datetime-local" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>

          <label for="priority">Priority</label>
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <label for="description">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Write something.." style={{height: "200px"}}></textarea>

          <input type="submit" value="Add Task" />

        </form>
      </div>

    </Div>
  )
})


const Div = styled.div`

  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  
  .form-header {
    font-size: 2rem;
    text-align: center;
}

& input[type=text],
& input[type=datetime-local],
& select,
& textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: none;
}

input[type=submit] {
    background-color: var(--form-button-color);
    color: var(--text-color);
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: var(--hover-background-color);
    color: var(--hover-text-color);
}

.container {
    width: 40%;
    margin: auto;
    border-radius: 5px;
    background-color: var(--form-background-color);
    padding: 20px;
    position: relative;
}


    


.form {
    padding-top: 36px;
}

.close {
    color: #aaaaaa;
    position: absolute;
    font-size: 28px;
    font-weight: bold;
    right: 24px;
    top: 24px;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
`;

export default AddTaskForm