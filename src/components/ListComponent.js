import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { useListContext } from '../context/ListContext';
import Card from './Card';


const ListComponent = React.forwardRef(({ list, listType, setList }, ref) => {

  const [sortState, setSortState] = useState('new on top');
  const {setDoList} = useListContext();


  function onChangeHandler(event) {
    setSortState(event.target.value);
    const value = event.target.value;
    console.log(value);
    let tmpList = list;
    if (value == 'new on top') {
      tmpList.sort(function (a, b) {
          if (a.taskid < b.taskid) return 1;
          return -1;
      })
  }
  else if (value == 'priority') {
      tmpList.sort(function (a, b) {
          let _a, _b;
          if (a.priority == 'high') _a = 4;
          else if (a.priority == 'medium') _a = 3;
          else if (a.priority == 'low') _a = 2;
          else _a = 1;

          if (b.priority == 'high') _b = 4;
          else if (b.priority == 'medium') _b = 3;
          else if (b.priority == 'low') _b = 2;
          else _b = 1;
          if (_a < _b) return 1;
          return -1;
      })
  }
  else if (value == 'deadline') {
      tmpList.sort(function (a, b) {
          let _a = new Date(a.deadline);
          let _b = new Date(b.deadline);

          if (_a < _b) return -1;
          return 1;
      })
  }

  setList(tmpList);

  }

  
  const sortRef = useRef();
  useLayoutEffect( () => {
    if(list.length == 0) sortRef.current.style.display = 'none';
    else sortRef.current.style.display = 'block';
  }, [list])

	return (
		<Div>
          <div className="header">
            <header className="list-header">{listType}</header>
            <div className="sort" ref={sortRef}>
              <label htmlFor="sort">
                <span>Sort</span>
                <select name="sorting" id="sort" value={sortState} onChange={onChangeHandler}>
                  <option value="new on top">New On Top</option>
                  <option value="priority">Priority</option>
                  <option value="deadline">Deadline</option>
                </select>
              </label>
            </div>
          </div>
		{list.map(task => {
			return <Card task={task} listType={listType} ref={ref}/>
		})}

        </Div>
	)
})

const Div = styled.div`

	height: 800px;
	flex: 1;
	background-color: var(--list-color);
	overflow: auto;
	padding: 24px;
	border-radius: 8px;



.header {
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
    align-items: baseline;
}

.list-header {
    font-size: 1.5rem;
}

.sort {
    /* display: none; */
}
`;

export default React.memo(ListComponent);