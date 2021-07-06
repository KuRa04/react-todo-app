import React, { useState } from 'react';
import './App.scss';

interface Todo {
  value: string
  id: number
  checked: boolean
  removed: boolean
}

type Filter = 'all' | 'checked' | 'unchecked' | 'removed'

const App: React.VFC = () => {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [isEditing, setEditing] = useState(false)

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
    e.preventDefault()

    if(!text) return

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false
    }

    setTodos([newTodo, ...todos])
    setText('')
  }

  const handleOnEdit = (id: number, value: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.value = value
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleOnCheck = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo
    })
    setTodos(newTodos)
  }


  const handleOnRemove = (id: number, removed: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.removed = !removed
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed)
    setTodos(newTodos)
  }

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed
      case 'checked':
        return todo.checked && !todo.removed
      case 'unchecked':
        return !todo.checked && !todo.removed
      case 'removed':
        return todo.removed
      default:
        return todo
    }
  })

  const editTask = () => {
    setEditing(!isEditing)
  }

  return (
    <div className='App'>
      <header className='header'>
        <h1 className='app_title'>Task List</h1>
        <div className='profile'>
          <img src='person1.svg' width='36' height='36'/>
          <h2 className='user_name'>yamada</h2>
        </div>
      </header>
      <main className='main'>
        <div className='schedule'>
          <h1 className='today'>今日</h1>
          <p className='date'>{new Date().getMonth()+1}月{new Date().getDate()}日</p>
        </div>
        <ul className='items'>
          {filteredTodos.map(todo => {
            return (
              <li className='task_item_list' key={todo.id}>
                <input className='task_item' type='text' disabled={todo.checked || todo.removed} value={todo.value} onChange={(e) => handleOnEdit(todo.id, e.target.value)} />
                <a className='delete_button' onClick={() => handleOnRemove(todo.id, todo.removed)}>{todo.removed ? 'restore' : 'delete'}</a>
              </li>
            )
          })}
        </ul>
        {isEditing ? (
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <input className='input_wrapper' type='text' value={text} disabled={filter === 'checked'} onChange={(e) => setText(e.target.value)} placeholder='タスク名' />
            <div className='buttons'>
              <button className='submit_button' onSubmit={() => handleOnSubmit}>タスクを追加</button>
              <button className='cancel_button' onClick={editTask}>キャンセル</button>
            </div>
          </form>
        ) : (
          <div className='add_task_wrapper'>
            <img src='plus.svg' width='18' height='18'/>
            <a className='add_task' onClick={editTask}>タスクを追加する</a>
          </div>
        )}
        {console.log(todos)}
      </main>
    </div>
  );
}

export default App;
