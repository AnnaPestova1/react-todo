import React from "react";
import Button from "../../Button";
import { ReactComponent as Add } from "../../../img/add_black_24dp.svg";
import { ReactComponent as NoImage } from "../../../img/image_not_supported_black_24dp.svg";
import PropTypes from "prop-types";

function FetchListItem({ book, addToRead }) {
  return (
    <li>
      <span>
        {book.volumeInfo?.imageLinks ? (
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
          />
        ) : (
          <span>
            <NoImage />
          </span>
        )}
      </span>

      <span>{book.volumeInfo?.title ? book.volumeInfo.title : ""}</span>
      <span>
        {book.volumeInfo?.authors
          ? book.volumeInfo.authors && book.volumeInfo.authors.join(", ")
          : ""}
      </span>
      <Button
        type="submit"
        title="add book in my list"
        onClick={() => addToRead(book)}
      >
        <Add />
      </Button>
    </li>
  );
}
FetchListItem.propTypes = {
  books: PropTypes.object,
  addToRead: PropTypes.func,
};
export default FetchListItem;
