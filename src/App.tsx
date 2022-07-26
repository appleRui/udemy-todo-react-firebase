import { Button, FormControl, TextField } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import './App.css';
import { db } from "./firebase"
import { TaskItem } from './TaskItem';

const App: FC = () =>{
  const [todos, setTodos] = useState([{
    id: "",
    title: ""
  }]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const result = db.collection("todos").onSnapshot((snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => (
          {
            id: doc.id,
            title: doc.data().title
          }
        ))
      )
    });
    return () => result();
  }, []);

  const onClickSend = () => {
    db.collection("todos").add({
      title: input
    });
    setInput("");
  };

  return (
    <div className="App">
      <h1>ToDo by react and firebase</h1>
      <FormControl>
        <TextField 
          label="New Input"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        />
      </FormControl>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={ onClickSend }
        disabled={!input}
      >投稿</Button>

      { todos.map((todo) =>
        <TaskItem key={ todo.id } id={ todo.id } title={ todo.title }></TaskItem>
        )
      }
    </div>
  );
}

export default App;
