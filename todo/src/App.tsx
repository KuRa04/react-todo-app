import React, { useState } from 'react';
import './App.css';

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

  return (
    <div className='App'>
    <header className='header'>
      <h1 className='app_title'>Task List</h1>
      <h2 className='user_name'>yamada</h2>
    </header>
      <select defaultValue='all' onChange={(e) => setFilter(e.target.value as Filter)}>
        <option value='all'>すべてのタスク</option>
        <option value='checked'>完了したタスク</option>
        <option value='unchecked'>未完了のタスク</option>
        <option value='removed'>削除済みのタスク</option>
      </select>
      {filter === 'removed' ? (
        <button onClick={() => handleOnEmpty()}>ゴミ箱を空にする</button>
      ) : (
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <input type='text' value={text} disabled={filter === 'checked'} onChange={(e) => setText(e.target.value)} />
          <input type='submit' value={'追加'} disabled={filter === 'checked'} onSubmit={(e) => handleOnSubmit(e)} />
        </form>
      )}
      <ul>
        {filteredTodos.map(todo => {
          return (
            <li key={todo.id}>
              <input type='checkbox' disabled={todo.removed} checked={todo.checked} onChange={() => handleOnCheck(todo.id, todo.checked)}/>
              <input type='text' disabled={todo.checked || todo.removed} value={todo.value} onChange={(e) => handleOnEdit(todo.id, e.target.value)} />
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>{todo.removed ? '復元' : '削除'}</button>
            </li>
          )
        })}
      </ul>
      {console.log(todos)}
    </div>
  );
}

export default App;
