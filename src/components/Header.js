import React, { useRef } from 'react'
import styled from 'styled-components'
import { useLocalStorageState } from '../utils';


const Header = React.forwardRef((props, ref) => {

  const[theme, setTheme] = useLocalStorageState('theme', 'light');
  if(theme == 'dark') document.documentElement.classList.add('dark');

  function handler(event) {
    setTheme(prv => {
      if(prv == 'light') return 'dark';
      return 'light';
    });

    if(theme == 'dark') document.documentElement.classList.remove('dark');
    else document.documentElement.classList.add('dark');
  }

  function addTaskHandler(event) {
    ref.current.style.display='block';
  }

  return (
    <Navbar className="navbar">
      <span className="tag-line">A little organization goes a long way...</span>
      <div>
        <button className="add-task-button" onClick={addTaskHandler}>Add Task</button>
        <button className="dark-theme" data-value="light" onClick={handler}>Dark Theme</button>
      </div>
    </Navbar>
  )
})

const Navbar = styled.nav`

  background-color: var(--navbar-color);
  display: flex;
  justify-content: space-around;
  align-items: center;

  .tag-line {
      font-size: 1.2rem;
  }


  & button {
      font-size: 16px;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;

      background: none;
      color: inherit;
      border: none;
      font: inherit;
      cursor: pointer;
      outline: inherit;

  }

  & button:hover,
  .dropdown:hover .dropbtn {
      background-color: var(--hover-background-color);
      color: var(--hover-text-color);
  }
`;

export default Header