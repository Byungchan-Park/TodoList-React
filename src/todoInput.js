import React from "react";

const TodoInput = ({ iptVal, handleChange, addTodo, inputRef, mode }) => {
  const handleChangeInput = (e) => {
    handleChange(e.target.value);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    if (!iptVal) {
      return alert("할일을 입력하세요!!!");
    }
    addTodo();
  };

  return (
    <section className="todoInput">
      <form className="form" onSubmit={onSubmitForm}>
        <label className="form__label" htmlFor="todo">
          ~ Today I need to ~
        </label>
        <input
          type="text"
          id="todo"
          name="createInput"
          className="form__input"
          value={iptVal}
          onChange={handleChangeInput}
          ref={inputRef}
          required
        />
        <button type="submit" className="form__submitBtn">
          <div>추가</div>
        </button>
      </form>
    </section>
  );
};

export default TodoInput;
