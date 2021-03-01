import { FC, useReducer, useState } from 'react'
import { Button } from '../components/Button'

const countBy = [3, 5, 7]

type todoType = 'ADD-TODO' | 'MARK-AS-DONE'

interface Todo {
  name: string
  complete: boolean
}

function reducer<T>(todos: Todo[], action: { type: todoType; payload: T }) {
  switch (action.type) {
    case 'ADD-TODO':
      if (typeof action.payload === 'string') {
        return [...todos, newTodo(action.payload)]
      }
      return todos
    case 'MARK-AS-DONE':
      return todos.map((todo, idx) => {
        if (typeof action.payload === 'number' && idx === action.payload) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })
    default:
      return todos
  }
}

function newTodo(name: string) {
  return { name, complete: false }
}

export const Todos: FC = () => {
  const [count, setCount] = useState(0)
  const [todos, dispatch] = useReducer(reducer, [])
  const [todoName, setTodoName] = useState('')

  return (
    <div className='App'>
      <div>{count}</div>
      {countBy.map(n => (
        <Button handleCount={{ n, setCount }} />
      ))}

      <form
        onSubmit={e => {
          e.preventDefault()
          dispatch({ type: 'ADD-TODO', payload: todoName })
          setTodoName('')
        }}
      >
        <input
          type='text'
          value={todoName}
          onChange={e => setTodoName(e.target.value)}
        />
      </form>

      {todos.map((todo, idx) => (
        <p
          key={idx}
          onClick={() => dispatch({ type: 'MARK-AS-DONE', payload: idx })}
          style={{ textDecoration: todo.complete ? 'line-through' : '' }}
        >
          {todo.name}
        </p>
      ))}

      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  )
}
