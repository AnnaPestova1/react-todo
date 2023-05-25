import React from "react";
import PropTypes from "prop-types";

/*component with reusable controlled input with label */
function InputWithLabel({
  id,
  children,
  value,
  type = "text",
  name = "title",
  onInputChange,
}) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor={id}>{children} </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
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
  name: PropTypes.string,
  onInputChange: PropTypes.func,
};
export default InputWithLabel;
