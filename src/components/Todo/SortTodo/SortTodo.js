import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import style from "./SortTodo.module.css";

function SortTodo({ sortList }) {
  return (
    <div className={style.SortTodo}>
      <span className={style.SortButton}>
        <Button
          type="button"
          onClick={() => {
            sortList("titleAsc");
          }}
        >
          Sort by title (A-Z)
        </Button>
        <Button
          type="button"
          onClick={() => {
            sortList("dateAsc");
          }}
        >
          Sort by date(asc)
        </Button>
      </span>
      <span className={style.SortButton}>
        <Button
          type="button"
          onClick={() => {
            sortList("titleDesc");
          }}
        >
          Sort by title (Z-A)
        </Button>
        <Button
          type="button"
          onClick={() => {
            sortList("dateDesc");
          }}
        >
          Sort by date(desc)
        </Button>
      </span>
    </div>
  );
}

SortTodo.propTypes = {
  sortList: PropTypes.func,
};
export default SortTodo;
