"use client";

import React, { useState } from 'react'
import './style.css'
import Draggable from 'react-draggable'
import { FiEdit2 } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

const ToDoList = () => {
  const [todos, setTodos] = React.useState([
    {
      key: 1,
      isDone: 0,
      text: 'pazara gidip 5kg salatalik al'
    },
    {
      key: 2,
      isDone: 1,
      text: 'kitap oku'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    const trimmedInputValue = inputValue.trim();
    const lastKey = todos[todos.length - 1]?.key || 0;
    const newTodos = { key: lastKey + 1, isDone: 0, text: trimmedInputValue }
    setTodos([...todos, newTodos]);
    setInputValue('');
  };

  const setTodoIsDone = (key) => () => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.key === key);
    todo.isDone = !todo.isDone;
    setTodos(newTodos);
  };

  const deleteTodo = (key) => () => {
    const newTodos = todos.filter((todo) => todo.key !== key);
    setTodos(newTodos);
  };

  const editTodo = (key) => () => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.key === key);
    const newTodoText = prompt('Enter new todo text', todo.text);
    todo.text = newTodoText;
    setTodos(newTodos);
  };

  return (
    <Draggable
      defaultPosition={{ x: 820, y: -40 }}>
      <div className="todoMain">
        <h3 className='todoMain__title'>ToDo List</h3>
        <ul className='todoMain__list'>
          {todos.map((todo) => (
            <li key={todo.key} className={todo.isDone ? 'todoMain__list__item-done' : 'todoMain__list__item'}>
              <input
                type="checkbox"
                className={todo.isDone ? 'todoMain__list__item-done__checkbox' : 'todoMain__list__item__checkbox'}
                checked={todo.isDone}
                onClick={setTodoIsDone(todo.key)}
              />
              <p className={todo.isDone ? 'todoMain__list__item-done__title' : 'todoMain__list__item__title'}>{todo.text}</p>
              <button onClick={editTodo(todo.key)}><FiEdit2 className='todoMain__list__item__edit' /></button>
              <button onClick={deleteTodo(todo.key)}><MdDelete className='todoMain__list__item__delete' /></button>
            </li>
          ))}
        </ul>
        <div className="todoMain__add">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='todoMain__add__input'
            name='todo__add'
          />
          <button className='todoMain__add__button' onClick={handleButtonClick}>Add</button>
        </div>
      </div>
    </Draggable>
  )
}

export default ToDoList