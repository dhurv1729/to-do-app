import React, { useContext, useState } from "react";
import {useLocalStorageState} from '../utils.js';

const ListContext = React.createContext();

export function ListProvider({children}) {
  const [doList, setDoList] = useLocalStorageState('do-list', ['do']);
  const [doingList, setDoingList] = useLocalStorageState('doing-list', ['doing']);
  const [doneList, setDoneList] = useLocalStorageState('done-list', ['done']);
  const [currentEditTask, setCurrentEditTask] = useState('');

  const value = {doList, doingList, doneList, setDoList, setDoingList, setDoneList, currentEditTask, setCurrentEditTask};

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}

export function useListContext() {
    const value = useContext(ListContext);
    if(!value) {
        throw new Error('something went worng with the provider');
    }
    return value;
}


