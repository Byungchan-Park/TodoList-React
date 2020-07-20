import React, { memo } from "react";

const DeleteBtnComp = ({ onRemove }) => {
  return (
    <button className="delete-btn" onClick={onRemove}>
      삭제
    </button>
  );
};

export default memo(DeleteBtnComp);
