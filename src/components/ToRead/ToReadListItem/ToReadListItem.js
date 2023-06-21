import React from "react";
import { ReactComponent as Remove } from "../../../img/delete_outline_black_24dp.svg";
// import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import Button from "../../Button";

/*component that add the title from submitted todo value in the list and remove item button*/
function ToReadListItem({ toRead, onRemoveToRead }) {
  return (
    <li>
      <span>
        {toRead.Name} {toRead.Author}
      </span>
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
