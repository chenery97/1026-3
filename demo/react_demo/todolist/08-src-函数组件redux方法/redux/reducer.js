import {
  ADD_TODO,
  CHANGE_TODO_DONE,
  CHANGE_ALL_DONE,
  DEL_TODO,
  DEL_COMPLETE_TODOS
} from './constants'
const initState = {
  todos: [{
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
    }
  ]
}
export default function reducer(state = initState, action) {
  const todos = [...state.todos]
  switch (action.type) {
    case ADD_TODO:
      const id = todos ? todos.reduce((prev, item) => prev > item.id ? prev : item.id, 0) + 1 : 1
      const todoName = action.data
      const obj = {
        id,
        todoName,
        isDone: false
      }
      return {
        todos: [obj, ...todos]
      }
    case CHANGE_TODO_DONE:
      todos.forEach(item => {
        if (item.id === action.data) {
          item.isDone = !item.isDone
        }
      })
      return {
        todos
      }
    case DEL_TODO:
      const newTodos = todos.filter(item => item.id !== action.data)
      return {
        todos: newTodos
      }
    case CHANGE_ALL_DONE:
      todos.forEach(item => item.isDone = action.data)
      return {
        todos
      }
    case DEL_COMPLETE_TODOS:
      const unCompleteTodos = todos.filter(item => !item.isDone)
      return {
        todos: unCompleteTodos
      }
    default:
      return state
  }
}