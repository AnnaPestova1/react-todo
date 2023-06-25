import React from "react";
import PropTypes from "prop-types";
import ToReadListItem from "../ToReadListItem/ToReadListItem";
import style from "./ToReadList.module.css";

//component that renders book list
function ToReadList({ toReadList, onRemoveToRead }) {
  return (
    <>
      <ul className={style.ToReadList}>
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
