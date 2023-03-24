import React from 'react'
import ListComponent from './ListComponent';
import {useListContext} from '../context/ListContext.js'
import styled from 'styled-components';




const Main = React.forwardRef((props, ref) => {

  const {doList, doingList, doneList, setDoList ,setDoingList, setDoneList} = useListContext();
  
  return (
    <MainContent>
      <div className="lists">
        <ListComponent func list={doList} listType={'To Do'} setList={setDoList} ref={ref}/>
        <ListComponent list={doingList} listType={'Doing'} setList={setDoingList} ref={ref}/>
        <ListComponent list={doneList} listType={'Done'} setList={setDoneList} ref={ref}/>
      </div>

    </MainContent>
  )
})

const MainContent = styled.main`
  .lists {
    display: flex;
    gap: 24px;
    width: 75%;
    margin: auto;
    margin-top: 32px;
}
`;

export default Main