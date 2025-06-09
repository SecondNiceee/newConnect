import React from "react";
import classes from "./OneInput.module.css";
const OneInput = ({ setInputValue, inputValue, className, ...props }) => {
  return (
    <input
      spellCheck="false"
      autoComplete="off"
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
      style={props.style}
      {...props}
      type="text"
      className={
        className ? [classes.OneInput, className].join(" ") : classes.OneInput
      }
    />
  );
};

export default OneInput;
