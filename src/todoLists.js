import React, { memo } from "react";
import CheckBox from "../src/components/form/checkInputComp";
import ModifyBtn from "./components/form/ModifyBtnComp";
import DeleteBtn from "../src/components/form/deleteBtnComp";

const TodoItem = ({ text, onRemove, modeToModify, onCheck, done }) => {
  return (
    <li>
      <CheckBox onCheck={onCheck} />
      <span className={done ? "completed" : ""}>{text}</span>
      <ModifyBtn modeToModify={modeToModify} />
      <DeleteBtn onRemove={onRemove} />
    </li>
  );
};

const TodoLists = ({ todos, onRemove, modeToModify, handleCheck }) => {
  const todoLists = todos.map((todo) => (
    <TodoItem
      key={todo.id}
      text={todo.text}
      done={todo.done}
      onRemove={() => onRemove(todo.id)}
      modeToModify={() => modeToModify(todo.id)}
      onCheck={() => handleCheck(todo.id)}
    />
  ));
  return <ul className="todoLists clearfix">{todoLists}</ul>;
};

export default memo(TodoLists);
