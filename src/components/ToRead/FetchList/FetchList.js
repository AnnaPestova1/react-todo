import React from "react";
import PropTypes from "prop-types";
import FetchListItem from "../FetchListItem/FetchListItem";
import Pagination from "../Pagination/Pagination";
import style from "./FetchList.module.css";

//Google search book results layout
function FetchList({ books, addToRead, onLoadMore }) {
  return (
    <>
      <div>
        <ul className={style.FetchBookList}>
          {books.map((book, index) => (
            <FetchListItem
              key={book.id + index}
              book={book}
              addToRead={addToRead}
            />
          ))}
        </ul>
        <Pagination onLoadMore={onLoadMore} />
      </div>
      {books.length === 0 && <div>Enter new boot through form</div>}
    </>
  );
}

FetchList.propTypes = {
  books: PropTypes.array,
  addToRead: PropTypes.func,
  onLoadMore: PropTypes.func,
};

export default FetchList;
