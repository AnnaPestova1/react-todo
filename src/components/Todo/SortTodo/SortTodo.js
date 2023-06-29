import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import style from "./SortTodo.module.css";

function SortTodo({ sortList, sortDirection }) {
  return (
    <div className={style.SortTodo}>
      <span className={style.SortButton}>
        <Button
          active={sortDirection === "titleAsc"}
          type="button"
          title="sort by title ascending order"
          onClick={() => {
            sortList("titleAsc");
          }}
        >
          Sort by title (A-Z)
        </Button>
        <Button
          active={sortDirection === "dateAsc"}
          type="button"
          title="sort by date ascending order"
          onClick={() => {
            sortList("dateAsc");
          }}
        >
          Sort by date(asc)
        </Button>
      </span>
      <span className={style.SortButton}>
        <Button
          active={sortDirection === "titleDesc"}
          type="button"
          title="sort by title descending order"
          onClick={() => {
            sortList("titleDesc");
          }}
        >
          Sort by title (Z-A)
        </Button>
        <Button
          active={sortDirection === "dateDesc"}
          type="button"
          title="sort by date descending order"
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
  sortDirection: PropTypes.string,
};
export default SortTodo;
