import React from "react";
import PropTypes from "prop-types";
import style from "./Button.module.css";

function Button({ type, title, onClick, children }) {
  return (
    <button
      className={style.AllButtons}
      type={type}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Button;
