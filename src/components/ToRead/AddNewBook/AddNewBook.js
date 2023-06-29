import React, { useState } from "react";
import PropTypes from "prop-types";
import InputWithLabel from "../../InputWithLabel";
import Button from "../../Button/Button";
import { ReactComponent as Add } from "../../../img/add_black_24dp.svg";
import style from "./AddNewBook.module.css";

function AddNewBook({ onAddNewBook, setIsManuallyAddingBook }) {
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");

  function handleAddNewBook(event) {
    event.preventDefault();
    if (bookName === "" || bookAuthor === "") {
      return;
    }
    onAddNewBook({ bookName: bookName, bookAuthor: bookAuthor });
    setBookName("");
    setBookAuthor("");
    setIsManuallyAddingBook(false);
  }

  return (
    <div>
      <h2>
        <strong>Enter new book</strong>
      </h2>
      <form onSubmit={handleAddNewBook} className={style.AddNewBook}>
        <div className={style.BookName}>
          <InputWithLabel
            id="bookName"
            placeholder="enter book name"
            name="book name"
            value={bookName}
            onInputChange={(event) => {
              setBookName(event.target.value);
            }}
          >
            <strong>Name:</strong>
          </InputWithLabel>
          <div>
            <InputWithLabel
              id="bookAuthor"
              placeholder="enter book author"
              name="book author"
              value={bookAuthor}
              onInputChange={(event) => {
                setBookAuthor(event.target.value);
              }}
            >
              <strong>Author:</strong>
            </InputWithLabel>
          </div>
          <div className={style.ButtonAddBook}>
            <Button type="submit" title="add information about new book">
              <Add />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

AddNewBook.propTypes = {
  onAddNewBook: PropTypes.func,
  setIsManuallyAddingBook: PropTypes.func,
};
export default AddNewBook;
