import React, { useContext } from 'react'
import styled from 'styled-components'
import { useListContext } from '../context/ListContext.js'
import PriorityCircle from './PriorityCircle.js'

function strToDate(str) {
  let date = new Date(str);
  let dateArr = date.toDateString().split(' ');
  let time = date.toLocaleTimeString('en-US', {
      hour: 'numeric', minute: 'numeric', hour12: true
  });
  let res = dateArr[2] + ' ' + dateArr[1] + ', ' + time
  return res;
}

const Card = React.forwardRef(({ task, listType }, ref) => {


  const { doList, doingList, doneList, setDoList, setDoingList, setDoneList, setCurrentEditTask, currentEditTask } = useListContext();

  let thirdButtonName, fourthButtonName;
  if(listType == 'To Do') {thirdButtonName = 'Start'; fourthButtonName='Mark as Done'}
  if(listType == 'Doing') {thirdButtonName = 'Add To Do'; fourthButtonName='Mark as Done'}
  if(listType == 'Done') {thirdButtonName = 'Add To Do'; fourthButtonName='Add To Doing'}

  function firstButtonHandler(event) {
    const id = event.target.closest(".card").id;
    if (listType == 'To Do') doList.forEach(t => { if (t.taskid == id) setCurrentEditTask(t); });
    if (listType == 'Doing') doingList.forEach(t => { if (t.taskid == id) setCurrentEditTask(t); });
    if (listType == 'Done') doneList.forEach(t => { if (t.taskid == id) setCurrentEditTask(t); });

    ref.current.style.display = 'block';
  }

  function secondButtonHandler(event) {
    const id = event.target.closest(".card").id;
    console.log(id);
    if (listType == 'To Do') setDoList(doList.filter(t => t.taskid != id));
    else if (listType == 'Doing') setDoingList(doingList.filter(t => t.taskid != id));
    else if (listType == 'Done') setDoneList(doneList.filter(t => t.taskid != id));
  }

  function thirdButtonHandler(event) {
    const id = event.target.closest(".card").id;
    let task;
    if (listType == 'To Do') {
      setDoList(doList.filter(t => {
        if (t.taskid == id) { task = t; return false; }
        return true;
      }));
      task.status = 'doing';
      setDoingList([task, ...doingList]);
    }
    else if (listType == 'Doing') {
      setDoingList(doingList.filter(t => {
        if (t.taskid == id) { task = t; return false; }
        return true;
      }));
      task.status = 'do';
      setDoList([task, ...doList]);
    }
    else if (listType == 'Done') {
      setDoneList(doneList.filter(t => {
        if (t.taskid == id) { task = t; return false; }
        return true;
      }));
      task.status = 'do';
      setDoList([task, ...doList]);
    }
  }

  function fourthButtonHandler(event) {
    const id = event.target.closest(".card").id;
    let task;
    if (listType == 'To Do') {
      setDoList(doList.filter(t => {
        if (t.taskid == id) { task = t; return false; }
        return true;
      }));
      task.status = 'done';

      setDoneList([task, ...doneList]);
    }
    else if (listType == 'Doing') {
      setDoingList(doingList.filter(t => {
        if (t.taskid == id) { task = t; return false; }
        return true;
      }));
      task.status = 'done';

      setDoneList([task, ...doneList]);
    }
    else if (listType == 'Done') {
      setDoneList(doneList.filter(t => {
        if (t.taskid == id) { task = t; return false; }
        return true;
      }));
      task.status = 'doing';
      setDoingList([task, ...doingList]);
    }
  }

  let color;
  if (task.priority == 'high') color = '#ff3737';
  else if (task.priority == 'medium') color = '#ed9900';
  else if (task.priority == 'low') color = '#5b5bff';
  else color = '#898989';

  console.log(task.priority);

  return (
    <Div className='card' id={task.taskid}>

      <div className="dropdown">
        <button className="dropbtn">&#8942;
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <button className='button-edit' onClick={firstButtonHandler}>Edit</button>
          <button className='button-remove' onClick={secondButtonHandler}>Remove</button>
          <button className='button-start' onClick={thirdButtonHandler}>{thirdButtonName}</button>
          <button className='button-mark-as-done' onClick={fourthButtonHandler}>{fourthButtonName}</button>
        </div>
      </div>

      <header className='card-header'>{task.title}</header>
      <div className='card-priority'><strong>Priority: </strong> <PriorityCircle color={color}/>{task.priority}</div>
      <div className='card-deadline'><strong>Deadline: </strong>{strToDate(task.deadline)}</div>
      <div className='card-description'><strong>Description: </strong>{task.description}</div>

    </Div>
  )
})

const Div = styled.div`

  background-color: var(--card-color);
  height: 225px;
  margin-top: 16px;
  border-radius: 8px;
  padding: 16px;
  overflow: auto;


.dropdown {
    float: right;
    position: relative;
}

.dropdown .dropbtn {
    font-size: 16px;
    border: none;
    color: var(--text-color);
    box-sizing: border-box;
    padding: 14px 16px;
    background-color: var(--ellipsis-background-color);
    margin: 0;
}


.dropdown-content {
    position: absolute;
    right: 0px;
    top: 0px;
    display: none;
    background-color: var(--button-color);
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown-content button {
    /* float: none; */
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    width: 100%;
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

.dropdown-content button:hover {
    background-color: var(--hover-background-color);
    color: var(--hover-text-color);
}

.dropdown:hover .dropdown-content {
    display: block;
}

.card-header {
  font-size: 1.4rem;
}

.card-header, .card-priority, .card-deadline {
    
    padding-bottom: 8px;
}

`;

export default Card