import React from "react";

const toDoLayout = ({ children }) => {
  return (
    <>
      <div className="wrapper">
        <header className="header">
          <img
            className="header__img"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg"
            alt=""
          />
          <h1 className="header__title">To-Do List</h1>
        </header>
        <section className="contents">{children}</section>
      </div>
    </>
  );
};

export default toDoLayout;
