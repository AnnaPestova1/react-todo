import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button.tsx";
import { ReactComponent as Remove } from "../../../img/delete_black_24dp-2.svg";
import style from "./ToReadListItem.module.css";

function ToReadListItem({ toRead, onRemoveToRead }) {
  return (
    <li className={style.ReadListItem}>
      <span className={style.BookName}>{toRead.Name}</span>
      <span className={style.BookAuthor}>{toRead.Author}</span>
      <span>
        <Button
          type="button"
          title="remove item"
          onClick={function () {
            return onRemoveToRead(toRead.id);
          }}
        >
          <Remove />
        </Button>
      </span>
    </li>
  );
}

ToReadListItem.propTypes = {
  toRead: PropTypes.object,
  onRemoveToRead: PropTypes.func,
};
export default ToReadListItem;
