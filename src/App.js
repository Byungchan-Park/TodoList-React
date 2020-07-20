import React, { useRef, useState, useEffect, useCallback } from "react";
import "./styles/index.css";

import { db } from "./firebase";
// import firebase from "firebase";

import TodoLayout from "./todoLayout";
import TodoInput from "./todoInput";
import TodoLists from "./todoLists";
import ModifyComp from "./components/ModifyComp";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [iptVal, setIptVal] = useState("");
  const [mode, setMode] = useState("read");
  const [idToModify, setIdToModify] = useState("");
  const inputText = useRef();
  const modifyInput = useRef();

  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // this code here... fires when the app.js loads
    db.collection("todos").onSnapshot((snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          done: doc.data().done,
        }))
      );
      // 이 부분 주의!!! 모든 변경사항들이 실시간으로 데이터베이스에 전달된 후 화면에 반영되기 때문에 각각의 value 설정을 주의해야 한다.
    });
  }, []);

  useEffect(() => {
    mode === "modify" && alert("수정모드로 변경되었습니다.");
    if (modifyInput.current) {
      modifyInput.current.value = todos.find(
        (todo) => todo.id === idToModify
      ).text;
      modifyInput.current.focus();
    }
  }, [mode, idToModify, todos]);

  const handleChange = useCallback((value) => {
    setIptVal(value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const addTodo = useCallback(() => {
    console.log("addTodo");
    db.collection("todos").add({
      text: iptVal,
      done: false,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setIptVal(""); // clear up the input after clicking "추가" button
    inputText.current.focus();
  }, [iptVal]);

  const modeToModify = useCallback((id) => {
    console.log("modeToModify");
    setMode("modify");
    setIdToModify(id);
  }, []);
  const modifyTodo = useCallback(() => {
    console.log("modifyTodo");
    db.collection("todos").doc(idToModify).set(
      {
        text: iptVal,
      },
      { merge: true }
    );

    setIdToModify("");
    setIptVal("");
    modifyInput.current = null;
    setMode("read");
  }, [idToModify, iptVal]);

  const cancelModify = useCallback(() => {
    console.log("cancelModify");
    setIdToModify("");
    setIptVal("");
    modifyInput.current = null;
    setMode("read");
  }, []);

  const onRemove = useCallback((id) => {
    console.log("onRemove");
    db.collection("todos").doc(id).delete();
  }, []);

  const handleCheck = (id) => {
    console.log("handleCheck");
    let checkedIndex = todos.findIndex((todo) => todo.id === id);
    db.collection("todos").doc(id).set(
      {
        done: !todos[checkedIndex].done,
      },
      { merge: true }
    );
  };

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
