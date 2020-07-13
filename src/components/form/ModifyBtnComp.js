import React from "react";

const correctBtnComp = ({ modeToModify }) => {
  return (
    <>
      <button className="correct-btn" onClick={modeToModify}>
        수정
      </button>
    </>
  );
};

export default correctBtnComp;
