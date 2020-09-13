import React, { useEffect, useRef } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import ModifyComp from "../components/ModifyComp"
import * as todoActions from "../store/modules/todoList"
import TodoInput from "../todoInput"
import TodoLayout from "../todoLayout"
import TodoLists from "../todoLists"

const TodoListContainer = ({ input, TodoActions, mode, list, idToModify }) => {
  const inputText = useRef()
  const modifyInput = useRef()

  useEffect(() => {
    console.log(mode)
    mode === "modify" && alert("수정모드로 변경되었습니다.")
    if (modifyInput.current) {
      modifyInput.current.value = list.find((todo) => todo.id === idToModify).text
      modifyInput.current.focus()
    }
  }, [mode, idToModify, list])

  const handleChange = (value) => {
    TodoActions.changeInput(value)
  }

  const addTodo = (value) => {
    TodoActions.createTodo(value)

    TodoActions.resetInput()
    inputText.current.focus()
  }

  const modeToModify = (id) => {
    TodoActions.selectItemToModify(id)
    TodoActions.modeToModify()
  }

  const modifyTodo = () => {
    TodoActions.modeToRead()
    TodoActions.modifyTodo(idToModify, input)
    TodoActions.resetIdToModify()
    TodoActions.resetInput()
    modifyInput.current = null
  }

  const cancelModify = () => {
    TodoActions.resetIdToModify()
    TodoActions.resetInput()
    modifyInput.current = null
    TodoActions.modeToRead()
  }

  const onRemove = (id) => {
    TodoActions.deleteTodo(id)
  }

  const handleCheck = (id) => {
    TodoActions.selectCompletedTodo(id)
  }
  return (
    <TodoLayout>
      {mode !== "modify" ? (
        <TodoInput todos={list} iptVal={input} handleChange={handleChange} addTodo={addTodo} inputRef={inputText} mode={mode} />
      ) : (
        <ModifyComp handleChange={handleChange} modifyTodo={modifyTodo} modifyInputRef={modifyInput} cancelModify={cancelModify} />
      )}
      <TodoLists todos={list} onRemove={onRemove} handleCheck={handleCheck} modeToModify={modeToModify} />
    </TodoLayout>
  )
}

const mapStateToProps = ({ input, mode, list, idToModify }) => ({ input, mode, list, idToModify })

const mapDispatchToProps = (dispatch) => ({
  TodoActions: bindActionCreators(todoActions, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer)
