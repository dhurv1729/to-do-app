import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { useListContext } from '../context/ListContext.js'


const EditTaskForm = React.forwardRef((props, ref) => {

  const { doList, doingList, doneList, setDoList, setDoingList, setDoneList, currentEditTask, setCurrentEditTask } = useListContext();


  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  useEffect( ()=> {
    if(currentEditTask == null) {
      setTitle('');
      setDeadline('');
      setDescription('');
      setPriority('');
    }
    else {
      setTitle(currentEditTask.title);
      setDeadline(currentEditTask.deadline);
      setDescription(currentEditTask.description);
      setPriority(currentEditTask.priority);
    }
  }, [currentEditTask])

  function submitHandler(event) {
    event.preventDefault();
    const task = currentEditTask;
    task.title = title;
    task.deadline = deadline;
    task.description = description;
    task.priority = priority;
    task.taskid = currentEditTask.taskid;

    let tmp = [];

      
      if (task.status == 'do') tmp = [...doList];
      if (task.status == 'doing') tmp = [...doingList];
      if (task.status == 'done') tmp = [...doneList];

      for (let i = 0; i < tmp.length; i++) {
        if (JSON.stringify(tmp[i]) == JSON.stringify(currentEditTask)) {
          tmp[i] = JSON.parse(JSON.stringify(currentEditTask));
          setCurrentEditTask(null); 
          break;
        }
      }

      if (task.status == 'do') setDoList(tmp);
      if (task.status == 'doing') setDoingList(tmp);
      if (task.status == 'done') setDoneList(tmp);
      ref.current.style.display = 'none';
    
  }


  function closeHandler() {
    ref.current.style.display = 'none';
  }

  return (
    <Div ref={ref}className="modal edit">

      <div className="container edit">
        <span className="close edit" onClick={closeHandler}>&times;</span>
        <header className="form-header">Edit Task</header>

        <form className="form edit-task" onSubmit={submitHandler}>

          <label htmlFor="edit-title">Task Title</label>
          <input type="text" id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label htmlFor="edit-deadline">Deadline</label>
          <input type="datetime-local" id="edit-deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

          <label htmlFor="edit-priority">Priority</label>
          <select id="edit-priority" value={priority} onChange={(e) => setPriority(e.target.value)} >
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <label htmlFor="edit-description">Description</label>
          <textarea id="edit-description" placeholder="Write something.." style={{ height: "200px" }} value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>

          <input type="submit" value="Edit Task" />

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

export default EditTaskForm