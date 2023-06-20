import React from "react";
import ToReadListItem from "../ToReadListItem/ToReadListItem";
// import TodoListItem from "../TodoListItem/TodoListItem";
// import style from "./TodoList.module.css";
import PropTypes from "prop-types";

/*component that renders all todo items*/
function ToReadList({ toReadList, onRemoveToRead }) {
  return (
    <>
      <ul>
        {toReadList.map(function (toRead) {
          return (
            <ToReadListItem
              key={toRead.id}
              toRead={toRead}
              onRemoveToRead={onRemoveToRead}
            ></ToReadListItem>
          );
        })}
      </ul>
    </>
  );
}
ToReadList.propTypes = {
  toReadList: PropTypes.array,
  onRemoveToRead: PropTypes.func,
};
export default ToReadList;
