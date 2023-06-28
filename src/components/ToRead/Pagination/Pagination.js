import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import style from "./Pagination.module.css";

function Pagination({ onLoadMore }) {
  return (
    <div className={style.LoadButton}>
      <Button onClick={onLoadMore}>Load more</Button>
    </div>
  );
}

Pagination.propTypes = {
  onLoadMore: PropTypes.func,
};
export default Pagination;
