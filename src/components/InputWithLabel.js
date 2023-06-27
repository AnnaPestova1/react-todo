import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/*component with reusable controlled input with label */
function InputWithLabel({
  id,
  children,
  value,
  placeholder,
  type = "text",
  name = "title",
  onInputChange,
}) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor={id}>{children} </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
}
InputWithLabel.propTypes = {
  id: PropTypes.string,
  children: PropTypes.object,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onInputChange: PropTypes.func,
};
export default InputWithLabel;
