import React from "react";
import PropTypes from "prop-types";
import style from "./Button.module.css";

//standart button in app
function Button({ active, type, title, onClick, children }) {
  return (
    <button
      className={active ? style.Active : style.AllButtons}
      type={type}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  active: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Button;
