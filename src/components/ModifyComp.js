import React from "react";

const ModifyComp = ({
  handleChange,
  modifyTodo,
  modifyInputRef,
  cancelModify,
}) => {
  const handleChangeInput = (e) => {
    handleChange(e.target.value);
  };
  return (
    <section className="modify-layer">
      <input
        type="text"
        className="modify-input"
        onChange={handleChangeInput}
        ref={modifyInputRef}
      />
      <button className="modify-ok" onClick={modifyTodo}>
        완료
      </button>
      <button className="modify-no" onClick={cancelModify}>
        취소
      </button>
    </section>
  );
};

export default ModifyComp;
