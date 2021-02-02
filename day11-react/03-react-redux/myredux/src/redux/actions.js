import { ADD_TODO, SET_TODO_ISDONE, DEL_TODO, CHANGEALLTODOS, CLEARCOMPLETE } from './constants'

function addTodo(data) {
  return {
    type: ADD_TODO,
    data
  }
}

function setIsDone(id) {
  return {
    type: SET_TODO_ISDONE,
    id
  }
}

function delTodo(id) {
  return {
    type: DEL_TODO,
    id
  }
}

function changeAllTodos(flag) {
  return {
    type: CHANGEALLTODOS,
    flag
  }
}

function clearCompleted() {
  return {
    type: CLEARCOMPLETE
  }
}

export {
  addTodo,
  setIsDone,
  delTodo,
  changeAllTodos,
  clearCompleted
}