import { ADD_TODO, SET_TODO_ISDONE, DEL_TODO, CHANGEALLTODOS, CLEARCOMPLETE} from './constants'

const initState = {
  todos: [
    {
      id: 1,
      todoName: '睡觉',
      isDone: true
    },
    {
      id: 2,
      todoName: '吃饭',
      isDone: false
    },
    {
      id: 3,
      todoName: '敲代码',
      isDone: false
    },
  ]
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case ADD_TODO:
      const todoName = action.data
      const id = state.todos.length ? state.todos.reduce((prev, item) => prev > item.id ? prev : item.id + 1, 0) : 1
      const obj = {
        id,
        todoName,
        isDone: false
      }
      return {
        ...state,
        todos: [obj, ...state.todos]
      }
    case SET_TODO_ISDONE:
      const updateTodos = state.todos.map(item => ({ ...item }))
      updateTodos.forEach(item => {
        if (item.id === action.id)
        item.isDone = !item.isDone
      })
      return {
        ...state,
        todos: updateTodos
      }
    case DEL_TODO:
      const newTodos = state.todos.filter(item => item.id !== action.id)
      return {
        ...state,
        todos: newTodos
      }
    case CHANGEALLTODOS:
      const changeAllTodos = state.todos.reduce((prev, item) => {
        item.isDone = action.flag
        return [...prev, {...item}]
      }, [])
      return {
        ...state,
        todos: changeAllTodos
      }
    case CLEARCOMPLETE:
      const uncompletedTodos = state.todos.filter(item => !item.isDone)
      return {
        ...state,
        todos: uncompletedTodos
      }
    default:
      return state
  }
}