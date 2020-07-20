import React, { memo } from "react";

const correctBtnComp = ({ modeToModify }) => {
  return (
    <>
      <button className="correct-btn" onClick={modeToModify}>
        수정
      </button>
    </>
  );
};

export default memo(correctBtnComp);
