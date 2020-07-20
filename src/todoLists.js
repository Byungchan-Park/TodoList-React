import React, { memo } from "react";
import CheckBox from "../src/components/form/checkInputComp";
import ModifyBtn from "./components/form/ModifyBtnComp";
import DeleteBtn from "../src/components/form/deleteBtnComp";

const TodoItem = memo(({ text, onRemove, modeToModify, onCheck, done }) => {
  console.log("todoItem");
  return (
    <li>
      <CheckBox onCheck={onCheck} done={done} />
      <span className={done ? "completed" : ""}>{text}</span>
      <ModifyBtn modeToModify={modeToModify} />
      <DeleteBtn onRemove={onRemove} />
    </li>
  );
});

const TodoLists = ({ todos, onRemove, modeToModify, handleCheck }) => {
  console.log("todoLists");
  const todoLists = todos.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        text={todo.text}
        done={todo.done}
        onRemove={() => onRemove(todo.id)}
        modeToModify={() => modeToModify(todo.id)}
        onCheck={() => handleCheck(todo.id)}
      />
    );
  });
  return <ul className="todoLists clearfix">{todoLists}</ul>;
};

export default memo(TodoLists);
