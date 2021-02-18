import { ADD_TODO, CHANGE_TODO_DONE, DEL_TODO, CHANGE_ALL_DONE, DEL_COMPLETE_TODOS } from './constants'
function addTodo(todoName) {
  return {
    type: ADD_TODO,
    data: todoName
  }
}
function changeTodoDone(id) {
  return {
      type: CHANGE_TODO_DONE,
      data: id
  }
}
function delTodo(id) {
  return {
    type: DEL_TODO,
    data: id
  }
}
function changeAllDone(isDone) {
  return {
    type: CHANGE_ALL_DONE,
    data: isDone
  }
}
function delCompleteTodos() {
  return {
    type: DEL_COMPLETE_TODOS
  }
}
export {
  addTodo,
  changeTodoDone,
  delTodo,
  changeAllDone,
  delCompleteTodos
}