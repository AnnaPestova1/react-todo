import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import { ReactComponent as Add } from "../../../img/add_black_24dp.svg";
import { ReactComponent as NoImage } from "../../../img/image_not_supported_black_24dp.svg";
import style from "./FetchListItem.module.css";

//Google search individual book layout
function FetchListItem({ book, addToRead }) {
  return (
    <li className={style.FetchBookFromGoogle}>
      <div className={style.BookNameAuthorImg}>
        <span className={style.BookImg}>
          {book.volumeInfo?.imageLinks ? (
            <img
              className={style.BookThumbnail}
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
            />
          ) : (
            <span>
              <NoImage />
            </span>
          )}
        </span>

        <span className={style.BookName}>
          {book.volumeInfo?.title ? book.volumeInfo.title : " "}
        </span>
        <span className={style.BookAuthor}>
          {book.volumeInfo?.authors
            ? book.volumeInfo.authors && book.volumeInfo.authors.join(", ")
            : " "}
        </span>
        <Button
          type="button"
          title="add book in my list"
          onClick={() => addToRead(book)}
          className={style.AddBookButton}
        >
          <Add />
        </Button>
      </div>
      <div className={style.BookDescription}>
        <p>
          {book.volumeInfo?.description ? book.volumeInfo.description : " "}
        </p>
      </div>
    </li>
  );
}

FetchListItem.propTypes = {
  book: PropTypes.object,
  addToRead: PropTypes.func,
};
export default FetchListItem;
