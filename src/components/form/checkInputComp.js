import React, { memo } from "react";

const CheckInputComp = ({ onCheck, done }) => {
  return (
    <div className="check-input-comp">
      <input
        className="check-input"
        type="checkbox"
        defaultChecked={done}
        onClick={onCheck}
      />
    </div>
  );
};

export default memo(CheckInputComp);
