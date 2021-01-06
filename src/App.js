import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    //   setTodos(snapshot.docs.map(doc => doc.data().todo))
    // })
    const fetchData = async () => {
      db.collection('todos').orderBy('timestamp', 'desc')
        .onSnapshot(gg => {
          setTodos(gg.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
    }
    fetchData();
  }, [])


  const addTodo = async (event) => {
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input])
    setInput('');
  }

  return (
    <div className="App">
      <h1>Hello, Welcome to Todo App</h1>

      <FormControl className="app__form">
        <InputLabel>:Write a todo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)} />
        <Button type='submit' disabled={!input} onClick={addTodo} variant="contained" color="secondary">Add To Do</Button>
      </FormControl>

      <div className="app__card">
        {todos.map(todo => (
          <Todo key={todo.id} id={todo.id} text={todo.todo} />
        ))}
      </div>
    </div >
  );
}

export default App;
