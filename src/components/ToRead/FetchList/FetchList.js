import React from "react";
import FetchListItem from "../FetchListItem/FetchListItem";
import style from "./FetchList.module.css";
import PropTypes from "prop-types";

function FetchList({ books, setBooks, addToRead }) {
  return (
    <ul>
      {books.map((book) => (
        <FetchListItem
          key={book.id}
          book={book}
          setBooks={setBooks}
          addToRead={addToRead}
        />
      ))}
    </ul>
  );
}
FetchList.propTypes = {
  books: PropTypes.array,
  setBooks: PropTypes.func,
  addToRead: PropTypes.func,
};

export default FetchList;
