import React, { useRef, useState, useEffect } from "react";
import "./styles/index.css";

import TodoLayout from "./todoLayout";
import TodoInput from "./todoInput";
import TodoLists from "./todoLists";
import ModifyComp from "./components/ModifyComp";

const App = () => {
  const inputText = useRef();
  const modifyInput = useRef();

  const [todos, setTodos] = useState([
    { id: 1, text: "기술면접 공부하기", done: false },
    { id: 2, text: "유튜브 인강듣기", done: false },
  ]);
  const [iptVal, setIptVal] = useState("");
  const [mode, setMode] = useState("read");
  const [indexToModify, setIndexToModify] = useState("");

  const handleChange = (value) => {
    setIptVal(value);
  };

  const nextId = useRef(3);

  const addTodo = () => {
    const newTodo = {
      id: nextId.current,
      text: iptVal,
      done: false,
    };
    setTodos([...todos, newTodo]);

    setIptVal("");
    nextId.current += 1;
    inputText.current.focus();
  };

  const modeToModify = (id) => {
    setMode("modify");
    const selectedTodo = todos.findIndex((todo) => todo.id === id);
    setIndexToModify(selectedTodo);
  };

  const modifyTodo = () => {
    const modified = {
      ...todos[indexToModify],
      text: iptVal,
    };
    setTodos([
      ...todos.slice(0, indexToModify),
      modified,
      ...todos.slice(indexToModify + 1, todos.length),
    ]);
    setIndexToModify("");
    setIptVal("");
    modifyInput.current = null;
    setMode("read");
  };

  const cancelModify = () => {
    setIndexToModify("");
    setIptVal("");
    modifyInput.current = null;
    setMode("read");
  };

  const onRemove = (id) => {
    const removed = (todoItem) => todoItem.id !== id;
    setTodos(todos.filter(removed));
  };

  const handleCheck = (id) => {
    console.log(id);
    const clicked = todos.findIndex((todo) => todo.id === id);
    const clickedTodo = {
      ...todos[clicked],
      done: !todos[clicked].done,
    };
    setTodos([
      ...todos.slice(0, clicked),
      clickedTodo,
      ...todos.slice(clicked + 1, todos.length),
    ]);
  };

  useEffect(() => {
    mode === "modify" && alert("수정모드로 변경되었습니다.");
    if (modifyInput.current) {
      modifyInput.current.value = todos[indexToModify].text;
      modifyInput.current.focus();
    }
  }, [mode, indexToModify, todos]);

  return (
    <TodoLayout>
      {mode !== "modify" ? (
        <TodoInput
          todos={todos}
          setTodos={setTodos}
          iptVal={iptVal}
          handleChange={handleChange}
          addTodo={addTodo}
          inputRef={inputText}
          mode={mode}
        />
      ) : (
        <ModifyComp
          handleChange={handleChange}
          modifyTodo={modifyTodo}
          modifyInputRef={modifyInput}
          cancelModify={cancelModify}
        />
      )}
      <TodoLists
        todos={todos}
        onRemove={onRemove}
        handleCheck={handleCheck}
        modeToModify={modeToModify}
      />
    </TodoLayout>
  );
};

export default App;
