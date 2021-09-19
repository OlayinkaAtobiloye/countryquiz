import React from "react";
import "./Wrapper.css";

const Wrapper = (props) => {
  return <section className="backgroundImage">{props.children}</section>;
};

export default Wrapper;
