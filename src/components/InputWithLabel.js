import React from "react";

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
export default InputWithLabel;
