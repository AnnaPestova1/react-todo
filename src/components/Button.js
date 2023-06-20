import React from "react";
import PropTypes from "prop-types";

function Button({ type, title, onClick, children }) {
  return (
    <button type={type} title={title} onClick={onClick}>
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
