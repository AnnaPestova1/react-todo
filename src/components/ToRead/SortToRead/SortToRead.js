import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button.tsx";
import style from "./SortToRead.module.css";

function SortToRead({ sortList, sortDirection }) {
  return (
    <div className={style.SortToRead}>
      <span className={style.SortButton}>
        <Button
          active={sortDirection === "NameAsc"}
          type="button"
          title="sort by name ascending order"
          onClick={() => {
            sortList("NameAsc");
          }}
        >
          Sort by name (A-Z)
        </Button>
        <Button
          active={sortDirection === "AuthorAsc"}
          type="button"
          title="sort by author ascending order"
          onClick={() => {
            sortList("AuthorAsc");
          }}
        >
          Sort by author (A-Z)
        </Button>
      </span>
      <span className={style.SortButton}>
        <Button
          active={sortDirection === "NameDesc"}
          type="button"
          title="sort by name descending order"
          onClick={() => {
            sortList("NameDesc");
          }}
        >
          Sort by name (Z-A)
        </Button>
        <Button
          active={sortDirection === "AuthorDesc"}
          type="button"
          title="sort by author descending order"
          onClick={() => {
            sortList("AuthorDesc");
          }}
        >
          Sort by author (Z-A)
        </Button>
      </span>
    </div>
  );
}

SortToRead.propTypes = {
  sortList: PropTypes.func,
  sortDirection: PropTypes.string,
};
export default SortToRead;
