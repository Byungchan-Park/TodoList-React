import React from "react";

const DeleteBtnComp = ({ onRemove }) => {
  return (
    <button className="delete-btn" onClick={onRemove}>
      삭제
    </button>
  );
};

export default DeleteBtnComp;
